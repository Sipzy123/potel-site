import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Trash2, Pencil, X, Check, LogOut, ShieldCheck,
  Package, Eye, EyeOff, AlertCircle, Save, Star,
  ChevronDown, ChevronUp, ImagePlus, Zap, Settings2,
  ShoppingCart, Download as DownloadIcon, FileText,
  Upload, Loader2, ImageOff, File as FileIcon,
} from 'lucide-react';
import { Product, CATEGORIES, ElectricalVariant } from '../types';

// ─── Credentials ──────────────────────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'potel@2025';

const parseSpecs = (raw?: string): Record<string, string> => {
  try { return JSON.parse(raw || '{}'); } catch { return {}; }
};

type TabId = 'description' | 'electrical' | 'mechanical' | 'ordering' | 'downloads';
const ALL_TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'description', label: 'Description',      icon: <FileText size={15} /> },
  { id: 'electrical',  label: 'Electrical Specs',  icon: <Zap size={15} /> },
  { id: 'mechanical',  label: 'Mechanical Specs',  icon: <Settings2 size={15} /> },
  { id: 'ordering',    label: 'Ordering Info',     icon: <ShoppingCart size={15} /> },
  { id: 'downloads',   label: 'Downloads',         icon: <DownloadIcon size={15} /> },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
    className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl font-bold text-sm text-white ${type === 'success' ? 'bg-[#29a847]' : 'bg-red-500'}`}>
    {type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
    {message}
  </motion.div>
);

// ─── Image Upload Widget ───────────────────────────────────────────────────────
// Upload from local → POST /api/upload/image → saved to public/uploads/images/
// Returns a URL like /uploads/images/filename.jpg
// That URL is stored in products.json and served statically.
// Future: when hosted on a real domain, the same URL works as-is.
const ImageUploader = ({
  label,
  value,       // current URL (could be /uploads/images/… or external https://…)
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const doUpload = async (file: File) => {
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload/image', { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
      const { url } = await res.json();
      onChange(url);
    } catch (e: any) {
      setError(e.message || 'Upload failed');
    }
    setUploading(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) doUpload(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) doUpload(file);
  };

  const hasImage = !!value;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all select-none overflow-hidden
          ${dragOver ? 'border-[#29a847] bg-[#29a847]/5' : hasImage ? 'border-slate-200 bg-slate-50' : 'border-slate-200 bg-slate-50 hover:border-[#29a847]/50 hover:bg-[#29a847]/5'}
          ${uploading ? 'pointer-events-none' : ''}`}
        style={{ minHeight: 120 }}
      >
        {/* Show current image as background */}
        {hasImage && !uploading && (
          <img
            src={value}
            alt="preview"
            className="absolute inset-0 w-full h-full object-contain p-3"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}

        {/* Overlay content */}
        <div className={`relative z-10 flex flex-col items-center gap-2 p-4 text-center ${hasImage ? 'bg-white/80 rounded-xl backdrop-blur-sm' : ''}`}>
          {uploading ? (
            <>
              <Loader2 size={24} className="text-[#29a847] animate-spin" />
              <span className="text-xs font-bold text-slate-500">Uploading…</span>
            </>
          ) : hasImage ? (
            <>
              <Upload size={18} className="text-[#29a847]" />
              <span className="text-xs font-bold text-[#29a847]">Click or drag to replace</span>
            </>
          ) : (
            <>
              <ImagePlus size={28} className="text-slate-300" />
              <span className="text-xs font-bold text-slate-500">Click to upload image</span>
              <span className="text-[10px] text-slate-400">JPG, PNG, WebP · max 10 MB</span>
              <span className="text-[10px] text-slate-400">Saved to <span className="font-mono">/public/uploads/images/</span></span>
            </>
          )}
        </div>

        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}

      {/* Show stored path for reference */}
      {value && (
        <p className="text-[10px] text-slate-400 font-mono truncate" title={value}>{value}</p>
      )}

      {/* Clear button */}
      {value && !uploading && (
        <button type="button" onClick={e => { e.stopPropagation(); onChange(''); }}
          className="text-[10px] text-red-400 hover:text-red-600 font-bold flex items-center gap-1">
          <X size={11} /> Remove image
        </button>
      )}
    </div>
  );
};

// ─── File Upload Widget (for downloads) ───────────────────────────────────────
interface DownloadFile {
  name: string;   // display name
  type: string;   // PDF / STEP / ZIP etc.
  size: string;   // "1.2 MB"
  url: string;    // /uploads/downloads/…
}

const DownloadUploader = ({
  file,
  index,
  onChange,
  onRemove,
}: {
  file: DownloadFile;
  index: number;
  onChange: (f: DownloadFile) => void;
  onRemove: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const doUpload = async (raw: File) => {
    setUploading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('file', raw);
      const res = await fetch('/api/upload/file', { method: 'POST', body: fd });
      if (!res.ok) throw new Error((await res.json()).error || 'Upload failed');
      const { url, name, size } = await res.json();
      // Auto-detect type from extension
      const ext = url.split('.').pop()?.toUpperCase() || 'FILE';
      onChange({ ...file, url, name: file.name || name, size, type: file.type || ext });
    } catch (e: any) { setError(e.message); }
    setUploading(false);
  };

  const hasFile = !!file.url;

  return (
    <div className="p-5 border border-slate-200 rounded-2xl space-y-4 bg-white relative">
      {/* Remove button */}
      <button type="button" onClick={onRemove}
        className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors">
        <X size={15} />
      </button>

      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Download File {index + 1}</p>

      {/* Upload zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex items-center gap-4 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all
          ${hasFile ? 'border-[#29a847]/30 bg-[#29a847]/5' : 'border-slate-200 hover:border-[#29a847]/40 hover:bg-slate-50'}
          ${uploading ? 'pointer-events-none' : ''}`}
      >
        {uploading ? (
          <Loader2 size={24} className="text-[#29a847] animate-spin flex-shrink-0" />
        ) : hasFile ? (
          <div className="size-10 bg-[#29a847] rounded-xl flex items-center justify-center flex-shrink-0">
            <FileIcon size={20} className="text-white" />
          </div>
        ) : (
          <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Upload size={20} className="text-slate-400" />
          </div>
        )}

        <div className="min-w-0">
          {uploading ? (
            <p className="text-xs font-bold text-slate-500">Uploading file…</p>
          ) : hasFile ? (
            <>
              <p className="text-xs font-bold text-slate-700 truncate">{file.url.split('/').pop()}</p>
              <p className="text-[10px] text-slate-400 font-mono">{file.url}</p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold text-slate-500">Click to upload file</p>
              <p className="text-[10px] text-slate-400">PDF, STEP, ZIP · max 50 MB · saved to <span className="font-mono">/public/uploads/downloads/</span></p>
            </>
          )}
        </div>

        {hasFile && !uploading && (
          <button type="button" onClick={e => { e.stopPropagation(); onChange({ ...file, url: '', size: '' }); }}
            className="ml-auto text-slate-300 hover:text-red-500 flex-shrink-0">
            <X size={14} />
          </button>
        )}

        <input ref={inputRef} type="file"
          accept=".pdf,.step,.stp,.zip,.dwg,.dxf,.stl,.doc,.docx"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) doUpload(f); e.target.value = ''; }}
        />
      </div>

      {error && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle size={12} />{error}</p>}

      {/* Metadata fields – shown after upload OR always for editing */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Display Name <span className="text-red-400">*</span>
          </label>
          <input value={file.name} onChange={e => onChange({ ...file, name: e.target.value })}
            placeholder="Technical Datasheet"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#29a847]" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">File Type</label>
          <input value={file.type} onChange={e => onChange({ ...file, type: e.target.value })}
            placeholder="PDF"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#29a847]" />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Size</label>
          <input value={file.size} onChange={e => onChange({ ...file, size: e.target.value })}
            placeholder="auto-filled"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#29a847]" />
        </div>
      </div>

      {/* Visibility hint */}
      {!hasFile && (
        <p className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 font-medium">
          ⚠ This entry will be hidden on the product page until a file is uploaded.
        </p>
      )}
    </div>
  );
};

// ─── Editable KV table (electrical, material, environment) ────────────────────
type KVRow = { [key: string]: string };
const EditableKVTable = ({
  title, rows, columns, onChange, onAdd, placeholder,
}: {
  title: string;
  rows: KVRow[];
  columns: { key: string; label: string; placeholder?: string }[];
  onChange: (rows: KVRow[]) => void;
  onAdd: () => void;
  placeholder?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">{title}</h4>
      <button type="button" onClick={onAdd}
        className="flex items-center gap-1 text-[#29a847] text-xs font-bold hover:underline">
        <Plus size={13} /> Add row
      </button>
    </div>
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map(c => (
              <th key={c.key} className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                {c.label}
              </th>
            ))}
            <th className="w-10 px-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-4 py-5 text-center text-slate-400 text-xs italic">
                {placeholder || `No rows yet — click "Add row" to begin`}
              </td>
            </tr>
          ) : rows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50/60">
              {columns.map(c => (
                <td key={c.key} className="px-2 py-1.5">
                  <input
                    value={row[c.key] || ''}
                    onChange={e => {
                      const updated = [...rows];
                      updated[i] = { ...updated[i], [c.key]: e.target.value };
                      onChange(updated);
                    }}
                    placeholder={c.placeholder}
                    className="w-full px-2 py-1.5 text-xs border border-transparent hover:border-slate-200 focus:border-[#29a847] rounded-lg focus:outline-none transition-colors bg-transparent"
                  />
                </td>
              ))}
              <td className="px-2 py-1.5 text-center">
                <button type="button" onClick={() => onChange(rows.filter((_, ri) => ri !== i))}
                  className="text-slate-300 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Mechanical 3-column editor ───────────────────────────────────────────────
const MechanicalEditor = ({
  value, onChange,
}: {
  value?: Product['mechanical'];
  onChange: (v: Product['mechanical']) => void;
}) => {
  const params = value?.parameters || [];
  const bb     = value?.ball_bearing || [];
  const sb     = value?.sleeve_bushing || [];

  const update = (i: number, col: 'parameters' | 'ball_bearing' | 'sleeve_bushing', v: string) => {
    const p = [...params]; const b = [...bb]; const s = [...sb];
    if (col === 'parameters')    p[i] = v;
    if (col === 'ball_bearing')  b[i] = v;
    if (col === 'sleeve_bushing') s[i] = v;
    onChange({ parameters: p, ball_bearing: b, sleeve_bushing: s });
  };

  const addRow = () => onChange({
    parameters:    [...params, ''],
    ball_bearing:  [...bb, ''],
    sleeve_bushing:[...sb, ''],
  });

  const removeRow = (i: number) => onChange({
    parameters:    params.filter((_, ri) => ri !== i),
    ball_bearing:  bb.filter((_, ri) => ri !== i),
    sleeve_bushing:sb.filter((_, ri) => ri !== i),
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Mechanical Parameters</h4>
        <button type="button" onClick={addRow}
          className="flex items-center gap-1 text-[#29a847] text-xs font-bold hover:underline">
          <Plus size={13} /> Add row
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-slate-50">
            <tr>
              {[
                { label: 'Parameter',      ph: 'e.g. Starting Torque' },
                { label: 'Ball Bearing',   ph: 'e.g. 8 gms. cm' },
                { label: 'Sleeve Bushing', ph: 'e.g. 150 gms. cm' },
              ].map(h => (
                <th key={h.label} className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                  {h.label}
                </th>
              ))}
              <th className="w-10 px-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {params.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-5 text-center text-slate-400 text-xs italic">
                  No rows yet — click "Add row" to begin
                </td>
              </tr>
            ) : params.map((_, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                {(['parameters', 'ball_bearing', 'sleeve_bushing'] as const).map((col, ci) => (
                  <td key={col} className="px-2 py-1.5">
                    <input
                      value={col === 'parameters' ? params[i] : col === 'ball_bearing' ? bb[i] : sb[i]}
                      placeholder={['e.g. Starting Torque', 'e.g. 8 gms. cm', 'e.g. 150 gms. cm'][ci]}
                      onChange={e => update(i, col, e.target.value)}
                      className="w-full px-2 py-1.5 text-xs border border-transparent hover:border-slate-200 focus:border-[#29a847] rounded-lg focus:outline-none transition-colors bg-transparent"
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5 text-center">
                  <button type="button" onClick={() => removeRow(i)}
                    className="text-slate-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Specs Quick-Boxes editor ─────────────────────────────────────────────────
const SpecsEditor = ({ specs, onChange }: {
  specs: Record<string, string>;
  onChange: (s: Record<string, string>) => void;
}) => {
  const entries = Object.entries(specs);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Quick Spec Boxes</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Shown as highlight boxes on the product detail page</p>
        </div>
        <button type="button"
          onClick={() => {
            const newKey = `param_${entries.length + 1}`;
            onChange({ ...specs, [newKey]: '' });
          }}
          className="flex items-center gap-1 text-[#29a847] text-xs font-bold hover:underline">
          <Plus size={13} /> Add spec
        </button>
      </div>

      {/* Table with headers */}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left w-1/2">
                Parameter Name <span className="text-slate-300 font-normal normal-case">(e.g. resolution, supply_voltage)</span>
              </th>
              <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left w-1/2">
                Value <span className="text-slate-300 font-normal normal-case">(e.g. 12-bit, 5V DC)</span>
              </th>
              <th className="w-10 px-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-5 text-center text-slate-400 text-xs italic">
                  No specs yet — click "Add spec" to add your first parameter
                </td>
              </tr>
            ) : entries.map(([key, val], i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                <td className="px-2 py-1.5">
                  <input
                    value={key}
                    placeholder="e.g. resolution"
                    onChange={e => {
                      const newKey = e.target.value;
                      const newEntries = [...entries];
                      newEntries[i] = [newKey, val];
                      onChange(Object.fromEntries(newEntries));
                    }}
                    className="w-full px-2 py-1.5 text-xs border border-transparent hover:border-slate-200 focus:border-[#29a847] rounded-lg focus:outline-none transition-colors bg-transparent"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    value={val}
                    placeholder="e.g. 12-bit"
                    onChange={e => {
                      const newEntries = [...entries];
                      newEntries[i] = [key, e.target.value];
                      onChange(Object.fromEntries(newEntries));
                    }}
                    className="w-full px-2 py-1.5 text-xs border border-transparent hover:border-slate-200 focus:border-[#29a847] rounded-lg focus:outline-none transition-colors bg-transparent"
                  />
                </td>
                <td className="px-2 py-1.5 text-center">
                  <button type="button"
                    onClick={() => {
                      const newEntries = entries.filter((_, ri) => ri !== i);
                      onChange(Object.fromEntries(newEntries));
                    }}
                    className="text-slate-300 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Full product form types ───────────────────────────────────────────────────

interface ElectricalVariantForm {
  name: string;
  diagram_images: string[];
  specs: { parameter: string; result: string }[];
  notes: string;
}

interface FullForm {
  name: string;
  category: string;
  subcategory: string;
  brief_description: string;
  description: string;
  price: string;
  image: string;
  images: string[];
  specs: Record<string, string>;
  is_featured: boolean;
  benefits: string[];
  variants: string[];
  mounting_info: string[];
  magnetic_cross_talk: string;
  electrical_variants: ElectricalVariantForm[];
  electrical: { parameter: string; result: string }[];
  electrical_options: { option: string; description: string }[];
  mechanical?: Product['mechanical'];
  material: { component: string; material: string }[];
  environment: { parameter: string; value: string }[];
  ordering_info: string;
  downloads: { name: string; type: string; size: string; url: string }[];
}

const productToForm = (p: Partial<Product>): FullForm => ({
  name:               p.name || '',
  category:           p.category || CATEGORIES[0].name,
  subcategory:        p.subcategory || CATEGORIES[0].subcategories[0],
  brief_description:  (p as any).brief_description || '',
  description:        p.description || '',
  price:              p.price || '',
  image:              p.image || '',
  images:             p.images || [],
  specs:              parseSpecs(p.specs),
  is_featured:        p.is_featured === 1,
  benefits:           p.benefits || [],
  variants:           p.variants || [],
  mounting_info:      p.mounting_info || [],
  magnetic_cross_talk:p.magnetic_cross_talk || '',
  electrical_variants:(p.electrical_variants || []).map(v => ({
    name: v.name || '',
    diagram_images: v.diagram_images || [],
    specs: v.specs || [],
    notes: v.notes || '',
  })),
  electrical:         p.electrical || [],
  electrical_options: p.electrical_options || [],
  mechanical:         p.mechanical,
  material:           p.material || [],
  environment:        p.environment || [],
  ordering_info:      p.ordering_info || '',
  downloads:          (p.downloads as any) || [],
});

// ─── Product Editor Modal ─────────────────────────────────────────────────────
const ProductEditor = ({
  product, onClose, onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: (data: FullForm, id?: number) => Promise<void>;
}) => {
  const isEdit = !!product?.id;
  const [form, setForm]       = useState<FullForm>(() => productToForm(product || {}));
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [saving, setSaving]   = useState(false);

  const set = <K extends keyof FullForm>(key: K, val: FullForm[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const catObj = CATEGORIES.find(c => c.name === form.category) || CATEGORIES[0];
  const listToText = (arr: string[]) => arr.join('\n');
  const textToList = (t: string) => t.split('\n').map(s => s.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form, isEdit ? product!.id : undefined);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <motion.div initial={{ opacity: 0, scale: 0.97, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full sm:rounded-3xl shadow-2xl sm:max-w-4xl sm:my-8 overflow-hidden min-h-screen sm:min-h-0">

        {/* Header */}
        <div className="bg-[#29a847] px-8 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-xl uppercase tracking-tight">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-white/70 text-xs mt-0.5">
              {isEdit ? `ID: ${product!.id} · ${product!.name}` : 'Fill all required fields'}
            </p>
          </div>
          <button onClick={onClose}
            className="size-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Tab bar */}
          <div className="flex border-b border-slate-100 bg-slate-50 overflow-x-auto">
            {ALL_TABS.map(t => (
              <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
                className={`px-5 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-2 transition-all border-b-2
                  ${activeTab === t.id ? 'text-[#29a847] border-[#29a847] bg-white' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8 space-y-8 max-h-[calc(100vh-200px)] sm:max-h-[70vh] overflow-y-auto">

            {/* ── DESCRIPTION TAB ───────────────────────────────────── */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input required value={form.name} onChange={e => set('name', e.target.value)}
                      placeholder="e.g. Rotary Miniature Angle Sensor"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Category <span className="text-red-500">*</span></label>
                    <select required value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: CATEGORIES.find(c => c.name === e.target.value)?.subcategories[0] || '' }))}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847]">
                      {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Subcategory <span className="text-red-500">*</span></label>
                    <select required value={form.subcategory} onChange={e => set('subcategory', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847]">
                      {catObj.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Price <span className="text-red-500">*</span></label>
                    <input required value={form.price} onChange={e => set('price', e.target.value)}
                      placeholder="Contact for Quote"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847]" />
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => set('is_featured', !form.is_featured)}
                        className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer
                          ${form.is_featured ? 'bg-[#29a847] border-[#29a847]' : 'border-slate-300 hover:border-[#29a847]/50'}`}>
                        {form.is_featured && <Check size={14} className="text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Featured Product</span>
                    </label>
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">
                    Brief Description
                    <span className="text-slate-400 font-normal ml-1">(card subtitle, 1 line)</span>
                  </label>
                  <input value={form.brief_description} onChange={e => set('brief_description', e.target.value)}
                    placeholder="Contactless rotary position sensor with programmable angle output"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847]" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea required rows={5} value={form.description} onChange={e => set('description', e.target.value)}
                    placeholder="Detailed product description shown on the product detail page…"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                </div>

                {/* ── Images ── */}
                <div className="space-y-5 pt-2 border-t border-slate-100">
                  <div>
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Images</h3>
                    <p className="text-[10px] text-slate-400">
                      Files are saved to <span className="font-mono">public/uploads/images/</span> and served at <span className="font-mono">/uploads/images/filename.jpg</span>.
                      When the site is hosted on a domain, the same path works automatically.
                    </p>
                  </div>

                  <ImageUploader
                    label="Main Product Image"
                    required
                    value={form.image}
                    onChange={v => set('image', v)}
                  />

                  <div className="space-y-4">
                    {form.images.map((img, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <ImageUploader
                            label={`Gallery Image ${i + 1}`}
                            value={img}
                            onChange={v => { const imgs = [...form.images]; imgs[i] = v; set('images', imgs); }}
                          />
                        </div>
                        <button type="button" className="mt-6 text-slate-300 hover:text-red-500 transition-colors"
                          onClick={() => set('images', form.images.filter((_, ri) => ri !== i))}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => set('images', [...form.images, ''])}
                      className="flex items-center gap-2 text-xs font-bold text-[#29a847] hover:underline">
                      <ImagePlus size={14} /> Add gallery image
                    </button>
                  </div>
                </div>

                {/* ── Quick specs ── */}
                <div className="pt-2 border-t border-slate-100">
                  <SpecsEditor specs={form.specs} onChange={v => set('specs', v)} />
                </div>

                {/* ── Lists ── */}
                <div className="space-y-5 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Key Benefits <span className="text-slate-400 font-normal">(one per line)</span>
                    </label>
                    <textarea rows={4} value={listToText(form.benefits)} onChange={e => set('benefits', textToList(e.target.value))}
                      placeholder={"Non-contact Hall Effect technology\nExceptionally long operational life\nCompact and lightweight design"}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Available Variants <span className="text-slate-400 font-normal">(one per line)</span>
                    </label>
                    <textarea rows={4} value={listToText(form.variants)} onChange={e => set('variants', textToList(e.target.value))}
                      placeholder={"12-bit resolution, 0–5V analog output\nPWM output version\nSPI / I²C digital output"}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Mounting Instructions <span className="text-slate-400 font-normal">(one step per line)</span>
                    </label>
                    <textarea rows={3} value={listToText(form.mounting_info)} onChange={e => set('mounting_info', textToList(e.target.value))}
                      placeholder={"Ensure panel hole is ≤ 9.5 mm\nMount using the star washer supplied"}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Magnetic Cross Talk Note
                      <span className="text-slate-400 font-normal ml-1">(leave blank to hide)</span>
                    </label>
                    <textarea rows={2} value={form.magnetic_cross_talk} onChange={e => set('magnetic_cross_talk', e.target.value)}
                      placeholder="If two units are installed within 2 inches of each other, install a steel shield between them…"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* ── ELECTRICAL TAB ────────────────────────────────────── */}
            {activeTab === 'electrical' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-medium">
                  Add electrical output variants (e.g. "Electrical Analog O/P", "PWM O/P"). Each variant gets its own
                  sidebar entry on the product page with diagrams and a spec table. Leave empty → tab hidden.
                </div>

                {/* Variant list */}
                <div className="space-y-4">
                  {form.electrical_variants.map((variant, vi) => (
                    <div key={vi} className="border border-slate-200 rounded-2xl overflow-hidden">
                      {/* Variant header */}
                      <div className="flex items-center gap-3 px-5 py-3 bg-slate-50 border-b border-slate-200">
                        <div className="size-7 rounded-lg bg-[#29a847] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                          {vi + 1}
                        </div>
                        <input
                          value={variant.name}
                          onChange={e => {
                            const evs = [...form.electrical_variants];
                            evs[vi] = { ...evs[vi], name: e.target.value };
                            set('electrical_variants', evs);
                          }}
                          placeholder="Variant name (e.g. Electrical Analog O/P)"
                          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold focus:outline-none focus:border-[#29a847] bg-white"
                        />
                        <button type="button"
                          onClick={() => set('electrical_variants', form.electrical_variants.filter((_, ri) => ri !== vi))}
                          className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="p-5 space-y-5">
                        {/* Diagram images */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                              Diagram Images <span className="text-slate-400 font-normal normal-case">(graphs, waveforms, option charts)</span>
                            </p>
                            <button type="button"
                              onClick={() => {
                                const evs = [...form.electrical_variants];
                                evs[vi] = { ...evs[vi], diagram_images: [...evs[vi].diagram_images, ''] };
                                set('electrical_variants', evs);
                              }}
                              className="flex items-center gap-1 text-[#29a847] text-xs font-bold hover:underline">
                              <ImagePlus size={13} /> Add diagram
                            </button>
                          </div>
                          {variant.diagram_images.length === 0 && (
                            <p className="text-xs text-slate-400 italic">No diagrams — click "Add diagram" to upload</p>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {variant.diagram_images.map((img, ii) => (
                              <div key={ii} className="relative">
                                <ImageUploader
                                  label={`Diagram ${ii + 1}`}
                                  value={img}
                                  onChange={v => {
                                    const evs = [...form.electrical_variants];
                                    const imgs = [...evs[vi].diagram_images];
                                    imgs[ii] = v;
                                    evs[vi] = { ...evs[vi], diagram_images: imgs };
                                    set('electrical_variants', evs);
                                  }}
                                />
                                <button type="button"
                                  onClick={() => {
                                    const evs = [...form.electrical_variants];
                                    evs[vi] = { ...evs[vi], diagram_images: evs[vi].diagram_images.filter((_, ri) => ri !== ii) };
                                    set('electrical_variants', evs);
                                  }}
                                  className="absolute top-6 right-0 text-slate-300 hover:text-red-500 transition-colors">
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Spec table */}
                        <EditableKVTable
                          title="Spec Table"
                          rows={variant.specs}
                          columns={[
                            { key: 'parameter', label: 'Parameter', placeholder: 'e.g. Supply Voltage' },
                            { key: 'result',    label: 'Value',     placeholder: 'e.g. 5V DC (±10%)' },
                          ]}
                          onChange={rows => {
                            const evs = [...form.electrical_variants];
                            evs[vi] = { ...evs[vi], specs: rows as any };
                            set('electrical_variants', evs);
                          }}
                          onAdd={() => {
                            const evs = [...form.electrical_variants];
                            evs[vi] = { ...evs[vi], specs: [...evs[vi].specs, { parameter: '', result: '' }] };
                            set('electrical_variants', evs);
                          }}
                        />

                        {/* Notes */}
                        <div>
                          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">
                            Notes <span className="text-slate-400 font-normal normal-case">(optional — shown as amber notice box)</span>
                          </label>
                          <textarea rows={2} value={variant.notes}
                            onChange={e => {
                              const evs = [...form.electrical_variants];
                              evs[vi] = { ...evs[vi], notes: e.target.value };
                              set('electrical_variants', evs);
                            }}
                            placeholder="e.g. Cross-talk warning or special condition…"
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] resize-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add variant button */}
                <button type="button"
                  onClick={() => set('electrical_variants', [
                    ...form.electrical_variants,
                    { name: '', diagram_images: [], specs: [], notes: '' }
                  ])}
                  className="flex items-center gap-2 text-[#29a847] text-xs font-bold hover:underline border-2 border-dashed border-[#29a847]/30 hover:border-[#29a847]/60 w-full justify-center py-4 rounded-2xl transition-all">
                  <Plus size={16} /> Add electrical variant (sidebar item)
                </button>
              </div>
            )}

            {/* ── MECHANICAL TAB ────────────────────────────────────── */}
            {activeTab === 'mechanical' && (
              <div className="space-y-8">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-medium">
                  Leave all three tables empty → the <strong>Mechanical Specs</strong> tab will be hidden on the product page.
                </div>

                <MechanicalEditor value={form.mechanical} onChange={v => set('mechanical', v)} />

                <EditableKVTable
                  title="Material"
                  rows={form.material}
                  columns={[
                    { key: 'component', label: 'Component', placeholder: 'e.g. Housing' },
                    { key: 'material',  label: 'Material',  placeholder: 'e.g. Brass' },
                  ]}
                  onChange={rows => set('material', rows as any)}
                  onAdd={() => set('material', [...form.material, { component: '', material: '' }])}
                />

                <EditableKVTable
                  title="Environment"
                  rows={form.environment}
                  columns={[
                    { key: 'parameter', label: 'Parameter', placeholder: 'e.g. Operating Temperature' },
                    { key: 'value',     label: 'Value',     placeholder: 'e.g. −40 to +85 °C' },
                  ]}
                  onChange={rows => set('environment', rows as any)}
                  onAdd={() => set('environment', [...form.environment, { parameter: '', value: '' }])}
                />
              </div>
            )}

            {/* ── ORDERING TAB ──────────────────────────────────────── */}
            {activeTab === 'ordering' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-medium">
                  Leave blank → the <strong>Ordering Info</strong> tab will be hidden on the product page.
                </div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Order Code / Format
                </label>
                <textarea rows={4} value={form.ordering_info} onChange={e => set('ordering_info', e.target.value)}
                  placeholder="RHSS-12 - [Input Voltage] - [Output Type] - [Angle Range] - [Direction] - [Shaft Dia] - [Options]"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:border-[#29a847] resize-none" />
              </div>
            )}

            {/* ── DOWNLOADS TAB ─────────────────────────────────────── */}
            {activeTab === 'downloads' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 font-medium">
                  Files are saved to <span className="font-mono">public/uploads/downloads/</span> and served at <span className="font-mono">/uploads/downloads/filename.pdf</span>.
                  Entries without an uploaded file are hidden on the product page.
                </div>

                {form.downloads.map((d, i) => (
                  <DownloadUploader
                    key={i}
                    index={i}
                    file={d}
                    onChange={updated => {
                      const ds = [...form.downloads]; ds[i] = updated; set('downloads', ds);
                    }}
                    onRemove={() => set('downloads', form.downloads.filter((_, ri) => ri !== i))}
                  />
                ))}

                <button type="button"
                  onClick={() => set('downloads', [...form.downloads, { name: '', type: 'PDF', size: '', url: '' }])}
                  className="flex items-center gap-2 text-[#29a847] text-xs font-bold hover:underline border-2 border-dashed border-[#29a847]/30 hover:border-[#29a847]/60 w-full justify-center py-4 rounded-2xl transition-all">
                  <Plus size={16} /> Add download file
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-slate-100 flex gap-3 bg-slate-50/50">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-[#29a847] text-white rounded-xl font-black text-sm hover:bg-[#29a847]/90 shadow-lg shadow-[#29a847]/20 disabled:opacity-60 flex items-center justify-center gap-2 transition-all">
              <Save size={16} />
              {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ─── Delete Confirm ────────────────────────────────────────────────────────────
const DeleteConfirm = ({ product, onConfirm, onCancel }: {
  product: Product; onConfirm: () => void; onCancel: () => void;
}) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
      <div className="size-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
        <Trash2 size={28} className="text-red-500" />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-2">Delete Product?</h3>
      <p className="text-slate-500 text-sm mb-6">
        "<span className="font-bold text-slate-700">{product.name}</span>" will be permanently removed.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black transition-all">Delete</button>
      </div>
    </motion.div>
  </div>
);

// ─── Login Screen ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) onLogin();
      else setError('Invalid username or password.');
    } catch {
      if (username === ADMIN_USER && password === ADMIN_PASS) onLogin();
      else setError('Invalid username or password.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(#29a847 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-[#29a847] mb-6 shadow-2xl shadow-[#29a847]/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-2">POTEL Product Management</p>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required autoFocus
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-[#29a847] focus:ring-2 focus:ring-[#29a847]/10 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:outline-none focus:border-[#29a847] focus:ring-2 focus:ring-[#29a847]/10 transition-all" />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm font-medium">
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>
            <button type="submit" disabled={loading}
              className="w-full bg-[#29a847] hover:bg-[#29a847]/90 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#29a847]/20 disabled:opacity-60 uppercase tracking-widest text-xs">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-slate-500 text-xs mt-6">
          Access via <span className="text-[#29a847] font-mono">yoursite.com/admin?admin=1</span>
        </p>
      </motion.div>
    </main>
  );
};

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [editorProduct, setEditorProduct] = useState<Partial<Product> | null | 'new'>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = async () => {
    setLoading(true);
    try { setProducts(await fetch('/api/products').then(r => r.json())); }
    catch { showToast('Failed to load products', 'error'); }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data: FullForm, id?: number) => {
    const cleanMech = data.mechanical?.parameters.some(p => p.trim()) ? data.mechanical : undefined;
    const payload = {
      ...data,
      specs:              JSON.stringify(data.specs),
      is_featured:        data.is_featured ? 1 : 0,
      mechanical:         cleanMech,
      electrical_variants: data.electrical_variants
        .filter(v => v.name.trim())
        .map(v => ({
          name: v.name,
          diagram_images: v.diagram_images.filter(Boolean),
          specs: v.specs.filter(s => s.parameter.trim()),
          notes: v.notes || undefined,
        })),
      electrical:         data.electrical.filter(e => e.parameter.trim()),
      electrical_options: data.electrical_options.filter(e => e.option.trim()),
      material:           data.material.filter(m => m.component.trim()),
      environment:        data.environment.filter(e => e.parameter.trim()),
      benefits:           data.benefits.filter(Boolean),
      variants:           data.variants.filter(Boolean),
      mounting_info:      data.mounting_info.filter(Boolean),
      images:             data.images.filter(Boolean),
      // Only save downloads that have a file uploaded
      downloads:          data.downloads.filter(d => d.url.trim() && d.name.trim()),
    };
    try {
      if (id) {
        await fetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        showToast('Product updated successfully');
      } else {
        await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        showToast('Product added successfully');
      }
      await load();
      setEditorProduct(null);
    } catch { showToast('Failed to save product', 'error'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await fetch(`/api/products/${deleteTarget.id}`, { method: 'DELETE' });
      showToast('Product deleted');
      await load();
    } catch { showToast('Failed to delete', 'error'); }
    setDeleteTarget(null);
  };

  const toggleFeatured = async (p: Product) => {
    try {
      await fetch(`/api/products/${p.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...p, is_featured: p.is_featured === 1 ? 0 : 1 }),
      });
      await load();
      showToast(p.is_featured === 1 ? 'Removed from featured' : 'Marked as featured');
    } catch { showToast('Failed to update', 'error'); }
  };

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    && (!catFilter || p.category === catFilter)
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="POTEL" className="h-8 sm:h-10 w-auto" />
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-xs font-black text-[#29a847] uppercase tracking-widest">Admin Panel</p>
              <p className="text-[10px] text-slate-400">Product Management</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition-all">
            <LogOut size={15} /> <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8">
        {/* Stats — 3 cols always but compact on mobile */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { label: 'Total Products', value: products.length, icon: Package, color: 'text-[#29a847] bg-[#29a847]/10' },
            { label: 'Featured',       value: products.filter(p => p.is_featured === 1).length, icon: Star, color: 'text-amber-500 bg-amber-50' },
            { label: 'Categories',     value: new Set(products.map(p => p.category)).size, icon: ChevronDown, color: 'text-blue-500 bg-blue-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-5 text-center sm:text-left">
              <div className={`size-8 sm:size-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
                <s.icon size={16} className="sm:hidden" />
                <s.icon size={22} className="hidden sm:block" />
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-black text-slate-900">{s.value}</p>
                <p className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest leading-tight">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] bg-white" />
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#29a847] bg-white sm:min-w-[160px]">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <button onClick={() => setEditorProduct('new')}
            className="flex items-center justify-center gap-2 bg-[#29a847] text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-[#29a847]/90 shadow-lg shadow-[#29a847]/20 whitespace-nowrap transition-all">
            <Plus size={17} /> Add Product
          </button>
        </div>

        {/* Product list — card on mobile, table on md+ */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Table header — hidden on mobile */}
          <div className="hidden md:grid grid-cols-[1fr_180px_80px_100px] bg-slate-50 border-b border-slate-100 px-6 py-3">
            {['Product', 'Category', 'Featured', 'Actions'].map(h => (
              <span key={h} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</span>
            ))}
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 size={24} className="animate-spin text-[#29a847] mx-auto mb-3" />
              <p className="text-slate-400 font-bold text-sm">Loading products…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-bold text-sm">No products found</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map(p => {
                const specs = parseSpecs(p.specs);
                const isExpanded = expandedId === p.id;
                return (
                  <div key={p.id} className="hover:bg-slate-50/40 transition-colors">
                    {/* Mobile card layout */}
                    <div className="md:hidden px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="size-14 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                            onError={e => { (e.target as any).style.opacity = '0'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 text-sm truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{p.subcategory}</p>
                          <p className="text-xs text-[#29a847] font-bold mt-1">{p.price}</p>
                          <span className="mt-1.5 inline-block text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full truncate max-w-[200px]">
                            {p.category}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => setEditorProduct(p)}
                              className="size-8 rounded-lg bg-slate-100 hover:bg-[#29a847] hover:text-white text-slate-500 flex items-center justify-center transition-all">
                              <Pencil size={13} />
                            </button>
                            <button onClick={() => setDeleteTarget(p)}
                              className="size-8 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center transition-all">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <button onClick={() => toggleFeatured(p)}
                            className={`transition-colors ${p.is_featured === 1 ? 'text-amber-400' : 'text-slate-300'}`}>
                            <Star size={17} fill={p.is_featured === 1 ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop table row layout */}
                    <div className="hidden md:grid grid-cols-[1fr_180px_80px_100px] items-center px-6 py-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="size-14 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover"
                            onError={e => { (e.target as any).style.opacity = '0'; }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-slate-900 text-sm truncate">{p.name}</p>
                          <p className="text-xs text-slate-400 truncate">{p.subcategory}</p>
                          <p className="text-xs text-[#29a847] font-bold mt-0.5">{p.price}</p>
                        </div>
                        <button onClick={() => setExpandedId(isExpanded ? null : p.id)}
                          className="ml-2 text-slate-300 hover:text-slate-500 flex-shrink-0 transition-colors">
                          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block max-w-[165px] truncate">
                        {p.category}
                      </span>
                      <div className="flex justify-center">
                        <button onClick={() => toggleFeatured(p)} title={p.is_featured === 1 ? 'Remove featured' : 'Mark as featured'}
                          className={`transition-colors ${p.is_featured === 1 ? 'text-amber-400 hover:text-amber-500' : 'text-slate-200 hover:text-amber-300'}`}>
                          <Star size={20} fill={p.is_featured === 1 ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditorProduct(p)}
                          className="size-9 rounded-lg bg-slate-100 hover:bg-[#29a847] hover:text-white text-slate-500 flex items-center justify-center transition-all" title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteTarget(p)}
                          className="size-9 rounded-lg bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center transition-all" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50/60">
                          <div className="px-6 pb-5 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <div className="md:col-span-2">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</p>
                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{p.description}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Quick Specs</p>
                              <div className="space-y-1.5">
                                {Object.entries(specs).slice(0, 5).map(([k, v]) => (
                                  <div key={k} className="flex justify-between text-xs gap-2">
                                    <span className="text-slate-400 capitalize">{k.replace(/_/g, ' ')}</span>
                                    <span className="text-slate-700 font-bold text-right">{v}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 text-center">
          {filtered.length} of {products.length} products · saved to{' '}
          <span className="font-mono">public/products.json</span>
        </p>
      </div>

      <AnimatePresence>
        {editorProduct !== null && (
          <ProductEditor
            product={editorProduct === 'new' ? null : editorProduct}
            onClose={() => setEditorProduct(null)}
            onSave={handleSave}
          />
        )}
        {deleteTarget && (
          <DeleteConfirm product={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
        )}
        {toast && <Toast message={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </main>
  );
};

// ─── Page root ────────────────────────────────────────────────────────────────
// Auth rules:
//   • Session stored in sessionStorage (key: 'potel_admin_auth')
//   • Survives re-renders, modal opens, and page refreshes WITHIN the same tab
//   • Clears when the tab is closed, or when they explicitly log out
//   • Navigating away from /admin and coming back = still logged in (same tab)
//   • Opening /admin in a new tab = must log in again (new sessionStorage)
//   • ?admin=1 must always be present in the URL — without it, redirect home
const ADMIN_SESSION_KEY = 'potel_admin_auth';

const AdminPage = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const hasAdminParam = new URLSearchParams(location.search).get('admin') === '1';

  // Read from sessionStorage on first mount so auth survives re-renders
  const [authed, setAuthed] = useState<boolean>(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  );

  const handleLogin = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
  };

  if (!hasAdminParam) {
    navigate('/');
    return null;
  }

  return authed
    ? <AdminDashboard onLogout={handleLogout} />
    : <LoginScreen onLogin={handleLogin} />;
};

export default AdminPage;
