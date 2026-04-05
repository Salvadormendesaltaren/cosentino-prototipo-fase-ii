"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { useReveal } from "@/hooks/useReveal";
import { useProtoCurtain } from "../layout";
import basePath from "@/lib/basePath";

/* ─── Project type hierarchy ────────────────────────────────── */
const PROJECT_GROUPS: Record<string, { label: string; tags: string[] }[]> = {
  Residencial: [
    { label: "Cocinas", tags: ["kitchens"] },
    { label: "Baños", tags: ["bathrooms"] },
    { label: "Salones", tags: ["interiors", "salones"] },
    { label: "Fachadas", tags: ["facades"] },
  ],
  Comercial: [
    { label: "Hoteles", tags: ["hotels"] },
    { label: "Oficinas", tags: ["offices"] },
    { label: "Retail", tags: ["retail"] },
    { label: "Espacios públicos", tags: ["public"] },
  ],
};

/* ─── Filter options ────────────────────────────────────────── */
const BRAND_OPTIONS = ["Silestone", "Dekton", "Sensa"];
const APPLICATION_OPTIONS = ["Encimeras", "Suelos", "Mobiliario", "Lavabos", "Escaleras", "Barbacoas", "Revestimientos", "Piscinas", "Platos de ducha", "Chimeneas"];
const STYLE_OPTIONS = ["Clásico", "Rústico", "Exótico", "Industrial", "Moderno", "Nórdico", "Mediterráneo", "Vintage"];
const COUNTRY_OPTIONS = ["España", "Francia", "Estados Unidos", "Reino Unido", "Países Bajos", "Brasil", "Australia", "Nueva Zelanda", "EAU", "Italia", "Alemania", "Israel", "Otros"];

/* ─── Data ──────────────────────────────────────────────────── */
interface MasonryItem {
  image: string;
  title: string;
  tags: string[];
  brand: string;
  application: string;
  style: string;
  country: string;
  href?: string;
}

const ITEMS: MasonryItem[] = [
  { image: "/images/kitchen-hexagonal.jpg", title: "Geometría hexagonal en la cocina", tags: ["kitchens"], brand: "Dekton", application: "Encimeras", style: "Moderno", country: "España" },
  { image: "/images/kitchen-luz-onda.jpg", title: "Luz y onda: cocina escultural", tags: ["kitchens"], brand: "Silestone", application: "Encimeras", style: "Nórdico", country: "Francia" },
  { image: "/images/kitchen-rustica.jpg", title: "Cocina rústica contemporánea", tags: ["kitchens"], brand: "Sensa", application: "Encimeras", style: "Rústico", country: "Italia" },
  { image: "/images/kitchen-jardin.jpg", title: "La cocina que mira al jardín", tags: ["kitchens"], brand: "Dekton", application: "Encimeras", style: "Mediterráneo", country: "España" },
  { image: "/images/kitchen-verde-smeg.jpg", title: "Verde Smeg: retro y actual", tags: ["kitchens"], brand: "Silestone", application: "Encimeras", style: "Vintage", country: "Reino Unido" },
  { image: "/images/kitchen-marmol-isla.jpg", title: "Isla de mármol: el centro de todo", tags: ["kitchens"], brand: "Sensa", application: "Encimeras", style: "Clásico", country: "Estados Unidos" },
  { image: "/images/kitchen-limones.jpg", title: "Limones y luz mediterránea", tags: ["kitchens"], brand: "Silestone", application: "Encimeras", style: "Mediterráneo", country: "España" },
  { image: "/images/kitchen-negra.jpg", title: "Total black: cocina sin concesiones", tags: ["kitchens"], brand: "Dekton", application: "Encimeras", style: "Industrial", country: "Alemania" },
  { image: "/images/contract-brutalismo.jpg", title: "Brutalismo y sensibilidad material", tags: ["public"], brand: "Dekton", application: "Revestimientos", style: "Industrial", country: "Francia" },
  { image: "/images/contract-museo-piedra.jpg", title: "Museo en piedra: volumen y silencio", tags: ["public"], brand: "Sensa", application: "Revestimientos", style: "Clásico", country: "España" },
  { image: "/images/contract-atrio-lucernario.jpg", title: "El atrio y el lucernario", tags: ["hotels"], brand: "Silestone", application: "Suelos", style: "Moderno", country: "EAU" },
  { image: "/images/contract-vidrio-oficinas.jpg", title: "Oficinas de vidrio y acero", tags: ["offices"], brand: "Dekton", application: "Revestimientos", style: "Moderno", country: "Estados Unidos" },
  { image: "/images/contract-hotel-cabana.jpg", title: "Hotel Cabaña: naturaleza habitada", tags: ["hotels"], brand: "Sensa", application: "Suelos", style: "Exótico", country: "Brasil" },
  { image: "/images/contract-galeria-ceramica.jpg", title: "Galería cerámica: arte y superficie", tags: ["retail"], brand: "Silestone", application: "Revestimientos", style: "Moderno", country: "Italia" },
  { image: "/images/contract-fachada-piedra.jpg", title: "Fachada en piedra: lo eterno", tags: ["facades"], brand: "Dekton", application: "Revestimientos", style: "Clásico", country: "España" },
  { image: "/images/contract-paneles-blancos.jpg", title: "Paneles blancos: ritmo y luz", tags: ["facades"], brand: "Silestone", application: "Revestimientos", style: "Nórdico", country: "Países Bajos" },
  { image: "/images/contract-corredor-marmol.jpg", title: "Corredor de mármol: perspectiva infinita", tags: ["hotels"], brand: "Sensa", application: "Suelos", style: "Clásico", country: "Italia" },
  { image: "/images/contract-escalera-ladrillo.jpg", title: "Escalera en ladrillo: lo artesanal elevado", tags: ["public"], brand: "Dekton", application: "Escaleras", style: "Rústico", country: "España" },
  { image: "/images/interior-boho-beige.jpg", title: "Boho beige: calidez sin esfuerzo", tags: ["interiors"], brand: "Silestone", application: "Suelos", style: "Exótico", country: "Australia" },
  { image: "/images/interior-salon-gris.jpg", title: "Salón gris: elegancia contenida", tags: ["interiors"], brand: "Dekton", application: "Mobiliario", style: "Moderno", country: "Francia" },
  { image: "/images/interior-butaca-amarilla.jpg", title: "La butaca amarilla como manifiesto", tags: ["interiors"], brand: "Sensa", application: "Mobiliario", style: "Vintage", country: "Reino Unido" },
  { image: "/images/interior-olivo-blanco.jpg", title: "Olivo y blanco: pureza mediterránea", tags: ["interiors"], brand: "Silestone", application: "Suelos", style: "Mediterráneo", country: "España" },
  { image: "/images/interior-cortinas-rosa.jpg", title: "Cortinas rosa: suavidad radical", tags: ["interiors"], brand: "Dekton", application: "Mobiliario", style: "Nórdico", country: "Países Bajos" },
  { image: "/images/interior-arbol-luz.jpg", title: "Árbol de luz: naturaleza interior", tags: ["interiors"], brand: "Sensa", application: "Suelos", style: "Exótico", country: "Nueva Zelanda" },
  { image: "/images/interior-sofa-tropical.jpg", title: "Sofá tropical: color y confort", tags: ["interiors"], brand: "Silestone", application: "Mobiliario", style: "Exótico", country: "Brasil" },
  { image: "/images/espacios-hero.png", title: "The Penthouse: vivir en lo alto", tags: ["facades"], brand: "Dekton", application: "Revestimientos", style: "Moderno", country: "EAU" },
  { image: "/images/espacios-mediterranea.png", title: "Arquitectura mediterránea con Dekton", tags: ["salones"], brand: "Dekton", application: "Suelos", style: "Mediterráneo", country: "España" },
  { image: "/images/espacios-continuidad.png", title: "Continuidad y resistencia", tags: ["salones"], brand: "Silestone", application: "Suelos", style: "Moderno", country: "España", href: "/prototipo/articulo/continuidad-y-resistencia" },
  { image: "/images/espacios-diafano.png", title: "Diáfano: la casa sin muros", tags: ["facades"], brand: "Sensa", application: "Revestimientos", style: "Nórdico", country: "Alemania" },
  { image: "/images/bath-piedra.png", title: "Baño en piedra natural", tags: ["bathrooms"], brand: "Sensa", application: "Lavabos", style: "Rústico", country: "Italia" },
  { image: "/images/bath-combinar.png", title: "El arte de combinar texturas", tags: ["bathrooms"], brand: "Silestone", application: "Platos de ducha", style: "Moderno", country: "Francia" },
  { image: "/images/bath-vida-natural.png", title: "Vida natural en el baño", tags: ["bathrooms"], brand: "Dekton", application: "Lavabos", style: "Nórdico", country: "Países Bajos" },
  { image: "/images/bath-homenaje.png", title: "Homenaje al agua: baño escultórico", tags: ["bathrooms"], brand: "Silestone", application: "Platos de ducha", style: "Clásico", country: "España" },
  { image: "/images/spa-exterior.png", title: "Spas de exterior: tendencia en auge", tags: ["outdoor"], brand: "Dekton", application: "Piscinas", style: "Mediterráneo", country: "España" },
  { image: "/images/as-little-design.png", title: "As little design as possible", tags: ["tendencias"], brand: "Sensa", application: "Mobiliario", style: "Industrial", country: "Alemania" },
  { image: "/images/spaces-cocina-terrazzo.jpg", title: "Terrazzo y cocina: textura viva", tags: ["kitchens"], brand: "Silestone", application: "Encimeras", style: "Vintage", country: "Italia" },
  { image: "/images/contract-mediterraneo.jpg", title: "Mediterráneo contract: hotel entre olivos", tags: ["hotels"], brand: "Silestone", application: "Suelos", style: "Mediterráneo", country: "España" },
  { image: "/images/contract-bloque-blanco.jpg", title: "Bloque blanco: geometría pura", tags: ["offices"], brand: "Dekton", application: "Revestimientos", style: "Moderno", country: "Estados Unidos" },
  { image: "/images/contract-curvas-plata.jpg", title: "Curvas en plata: museo contemporáneo", tags: ["public"], brand: "Sensa", application: "Revestimientos", style: "Moderno", country: "Israel" },
  { image: "/images/contract-damero.jpg", title: "Damero urbano: fachada con ritmo", tags: ["facades"], brand: "Dekton", application: "Revestimientos", style: "Industrial", country: "Reino Unido" },
];

/* ─── Filter state ──────────────────────────────────────────── */
interface FilterState {
  projectGroups: Record<string, boolean>;
  projectTags: string[];
  brands: string[];
  applications: string[];
  styles: string[];
  countries: string[];
}
const EMPTY_FILTERS: FilterState = { projectGroups: { Residencial: true, Comercial: true }, projectTags: [], brands: [], applications: [], styles: [], countries: [] };
type FilterKey = "project" | "brand" | "application" | "style" | "country";
const FILTER_BUTTONS: { key: FilterKey; label: string }[] = [
  { key: "project", label: "Tipo de proyecto" }, { key: "brand", label: "Marca" },
  { key: "application", label: "Aplicaciones" }, { key: "style", label: "Estilo" }, { key: "country", label: "País" },
];

/* ─── Lists ─────────────────────────────────────────────────── */
interface SavedList { id: string; name: string; items: string[]; updatedAt: number; }
type SidebarView = "lists" | "save-item" | "create";
type ListViewMode = "grid" | "magazine";

function timeAgo(ts: number): string {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 60) return "hace unos minutos";
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Última vez ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Última vez ${days} día${days !== 1 ? "s" : ""}`;
}
let _listId = 0;
function nextId() { return `list-${++_listId}-${Date.now()}`; }

/* ─── Checkbox (dark) ───────────────────────────────────────── */
function Checkbox({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => !disabled && onChange(!checked)} disabled={disabled}
      className={`flex items-center gap-[10px] text-[13px] text-white text-left transition-opacity duration-200 ${disabled ? "opacity-20 cursor-not-allowed" : "cursor-pointer hover:opacity-100"}`}
      style={{ opacity: disabled ? undefined : checked ? 1 : 0.55 }}>
      <span className={`w-[17px] h-[17px] rounded-[3px] border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${checked && !disabled ? "bg-white border-white" : "border-white/40 bg-transparent"}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke={disabled ? "white" : "black"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      {label}
    </button>
  );
}

/* ─── Checkbox (light, sidebar) ─────────────────────────────── */
function CheckboxLight({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-[10px] text-[14px] text-black/80 text-left cursor-pointer w-full py-[6px]">
      <span className={`w-[18px] h-[18px] rounded-[3px] border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${checked ? "bg-black border-black" : "border-black/25 bg-transparent"}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function EncuentraPage() {
  const { navigateTo } = useProtoCurtain();
  const revealRef = useReveal();

  /* ── Filter state ──────────────────────────────────────────── */
  const [filters, setFilters] = useState<FilterState>({ ...EMPTY_FILTERS });
  const [pending, setPending] = useState<FilterState>({ ...EMPTY_FILTERS });
  const [openPanel, setOpenPanel] = useState<FilterKey | null>(null);
  const [searchMode, setSearchMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const subSentinelRef = useRef<HTMLDivElement>(null);
  const [subStuck, setSubStuck] = useState(false);

  /* ── Lists & sidebar ───────────────────────────────────────── */
  const [lists, setLists] = useState<SavedList[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState<SidebarView>("lists");
  const [savingItemImage, setSavingItemImage] = useState<string | null>(null);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [newListName, setNewListName] = useState("");
  const [savingSearchItems, setSavingSearchItems] = useState<string[] | null>(null);

  /* ── List detail view ──────────────────────────────────────── */
  const [viewingListId, setViewingListId] = useState<string | null>(null);
  const [listViewMode, setListViewMode] = useState<ListViewMode>("grid");

  const viewedList = viewingListId ? lists.find((l) => l.id === viewingListId) : null;
  const viewedItems = viewedList ? ITEMS.filter((item) => viewedList.items.includes(item.image)) : [];

  /* ── Filter derived ────────────────────────────────────────── */
  function resolveProjectTags(f: FilterState): string[] {
    const tags: string[] = [];
    for (const [g, subs] of Object.entries(PROJECT_GROUPS)) { if (!f.projectGroups[g]) continue; for (const s of subs) { if (f.projectTags.includes(s.label)) tags.push(...s.tags); } }
    return tags;
  }
  const activeProjectTags = resolveProjectTags(filters);
  const filteredItems = ITEMS.filter((item) => {
    if (filters.projectTags.length > 0 && activeProjectTags.length > 0 && !item.tags.some((t) => activeProjectTags.includes(t))) return false;
    if (filters.brands.length > 0 && !filters.brands.includes(item.brand)) return false;
    if (filters.applications.length > 0 && !filters.applications.includes(item.application)) return false;
    if (filters.styles.length > 0 && !filters.styles.includes(item.style)) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(item.country)) return false;
    return true;
  });
  const filterKey = JSON.stringify(filters);
  function getCount(key: FilterKey): number {
    switch (key) { case "project": return filters.projectTags.length; case "brand": return filters.brands.length; case "application": return filters.applications.length; case "style": return filters.styles.length; case "country": return filters.countries.length; }
  }
  const totalFilterCount = FILTER_BUTTONS.reduce((s, f) => s + getCount(f.key), 0);

  /* ── Toast helper ──────────────────────────────────────────── */
  function toast(msg: string) { setToastMsg(msg); setShowToast(true); setTimeout(() => setShowToast(false), 2500); }

  /* ── Filter actions ────────────────────────────────────────── */
  function openFilterPanel(key: FilterKey) {
    setSearchMode(false); setCountrySearch("");
    if (openPanel === key) { setOpenPanel(null); return; }
    setPending({ ...filters, projectGroups: { ...filters.projectGroups }, projectTags: [...filters.projectTags], brands: [...filters.brands], applications: [...filters.applications], styles: [...filters.styles], countries: [...filters.countries] });
    setOpenPanel(key);
  }
  function applyFilters() { setFiltering(true); const n = { ...pending }; setTimeout(() => { setFilters(n); setOpenPanel(null); setFiltering(false); }, 250); }
  function clearPending(key: FilterKey) {
    switch (key) { case "project": setPending((p) => ({ ...p, projectTags: [], projectGroups: { Residencial: true, Comercial: true } })); break; case "brand": setPending((p) => ({ ...p, brands: [] })); break; case "application": setPending((p) => ({ ...p, applications: [] })); break; case "style": setPending((p) => ({ ...p, styles: [] })); break; case "country": setPending((p) => ({ ...p, countries: [] })); break; }
  }
  function clearAllFilters() { setFiltering(true); setTimeout(() => { setFilters({ ...EMPTY_FILTERS, projectGroups: { ...EMPTY_FILTERS.projectGroups } }); setFiltering(false); }, 250); }
  function toggleArray(a: string[], v: string) { return a.includes(v) ? a.filter((x) => x !== v) : [...a, v]; }
  function togglePendingSimple(f: "brands" | "applications" | "styles" | "countries", v: string) { setPending((p) => ({ ...p, [f]: toggleArray(p[f], v) })); }
  function selectAllPending(f: "brands" | "applications" | "styles" | "countries") { setPending((p) => ({ ...p, [f]: [] })); }
  function togglePendingProjectTag(l: string) { setPending((p) => ({ ...p, projectTags: toggleArray(p.projectTags, l) })); }
  function togglePendingProjectGroup(g: string) { setPending((p) => ({ ...p, projectGroups: { ...p.projectGroups, [g]: !p.projectGroups[g] } })); }

  /* ── List actions ──────────────────────────────────────────── */
  function isItemSaved(img: string) { return lists.some((l) => l.items.includes(img)); }

  function handleBookmark(img: string) {
    setSavingItemImage(img); setSelectedListIds(lists.filter((l) => l.items.includes(img)).map((l) => l.id));
    setSavingSearchItems(null); setSidebarView("save-item"); setSidebarOpen(true);
  }
  function handleSaveSearch() {
    setSavingSearchItems(filteredItems.map((i) => i.image)); setSavingItemImage(null);
    setNewListName(""); setSidebarView("create"); setSidebarOpen(true);
  }
  function handleConfirmSaveItem() {
    if (!savingItemImage) return;
    setLists((prev) => prev.map((list) => {
      const has = list.items.includes(savingItemImage); const sel = selectedListIds.includes(list.id);
      if (sel && !has) return { ...list, items: [...list.items, savingItemImage], updatedAt: Date.now() };
      if (!sel && has) return { ...list, items: list.items.filter((i) => i !== savingItemImage), updatedAt: Date.now() };
      return list;
    }));
    setSavingItemImage(null); setSidebarView("lists");
  }
  function handleCreateList() {
    if (!newListName.trim()) return;
    const nl: SavedList = { id: nextId(), name: newListName.trim(), items: savingSearchItems ?? (savingItemImage ? [savingItemImage] : []), updatedAt: Date.now() };
    setLists((p) => [...p, nl]); setNewListName(""); setSavingSearchItems(null);
    if (savingItemImage) { setSelectedListIds((p) => [...p, nl.id]); setSidebarView("save-item"); }
    else { setSidebarView("lists"); }
  }
  function handleViewList(id: string) { setViewingListId(id); setListViewMode("grid"); setSidebarOpen(false); }
  function handleShareList() {
    if (!viewedList) return;
    const url = `${window.location.origin}${basePath}/prototipo/encuentra?lista=${encodeURIComponent(viewedList.name)}`;
    navigator.clipboard.writeText(url).then(() => toast("Enlace copiado al portapapeles")).catch(() => toast("No se pudo copiar el enlace"));
  }
  function closeSidebar() { setSidebarOpen(false); setSavingItemImage(null); setSavingSearchItems(null); }
  function openMisListas() { setSavingItemImage(null); setSavingSearchItems(null); setSidebarView("lists"); setSidebarOpen(true); }

  /* ── Click outside ─────────────────────────────────────────── */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (pillRef.current && !pillRef.current.contains(e.target as Node)) setOpenPanel(null);
  }, []);
  useEffect(() => { document.addEventListener("mousedown", handleClickOutside); return () => document.removeEventListener("mousedown", handleClickOutside); }, [handleClickOutside]);

  /* ── Reveal observer ───────────────────────────────────────── */
  useEffect(() => {
    const el = revealRef.current; if (!el) return;
    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => t.classList.remove("visible"));
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1 });
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [filterKey, revealRef, viewingListId, listViewMode]);

  /* ── Sub-header stuck detection ──────────────────────────── */
  useEffect(() => {
    const sentinel = subSentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([e]) => setSubStuck(!e.isIntersecting),
      { threshold: 0, rootMargin: "-66px 0px 0px 0px" },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [viewingListId]);

  /* ── Filter panel renderers ────────────────────────────────── */
  function renderProjectPanel() {
    return (
      <div className="w-[380px] rounded-[16px] p-[20px] flex flex-col gap-[14px] bg-[#1a1a1a]">
        <div className="flex items-center justify-between">
          <span className="text-white text-[14px] font-medium">Tipo de proyecto</span>
          <button type="button" onClick={() => setOpenPanel(null)} className="text-white/50 hover:text-white transition-colors cursor-pointer"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></button>
        </div>
        <div className="flex gap-[8px]">
          {Object.keys(PROJECT_GROUPS).map((g) => (
            <button key={g} type="button" onClick={() => togglePendingProjectGroup(g)} className={`px-[14px] py-[6px] rounded-full text-[13px] transition-all duration-200 cursor-pointer ${pending.projectGroups[g] ? "bg-white text-black font-medium" : "bg-white/10 text-white/50"}`}>{g}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[10px]">
          <Checkbox label="Todo" checked={pending.projectTags.length === 0} onChange={() => setPending((p) => ({ ...p, projectTags: [] }))} />
          {Object.entries(PROJECT_GROUPS).map(([gn, subs]) => subs.map((s) => (
            <Checkbox key={s.label} label={s.label} checked={pending.projectTags.includes(s.label)} disabled={!pending.projectGroups[gn]} onChange={() => togglePendingProjectTag(s.label)} />
          )))}
        </div>
        {renderPanelFooter("project")}
      </div>
    );
  }

  function renderSimplePanel(key: FilterKey, title: string, options: string[], field: "brands" | "applications" | "styles" | "countries", searchable?: boolean) {
    const sel = pending[field];
    const opts = searchable && countrySearch ? options.filter((o) => o.toLowerCase().includes(countrySearch.toLowerCase())) : options;
    return (
      <div className="w-[360px] rounded-[16px] p-[20px] flex flex-col gap-[14px] bg-[#1a1a1a]">
        <div className="flex items-center justify-between">
          <span className="text-white text-[14px] font-medium">{title}</span>
          <button type="button" onClick={() => setOpenPanel(null)} className="text-white/50 hover:text-white transition-colors cursor-pointer"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></button>
        </div>
        {searchable && (
          <div className="flex items-center gap-[8px] bg-white/10 rounded-[10px] px-[12px] py-[8px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 opacity-40"><circle cx="5.5" cy="5.5" r="4.75" stroke="white" strokeWidth="1" /><line x1="9" y1="9" x2="13" y2="13" stroke="white" strokeWidth="1" /></svg>
            <input type="text" placeholder="Buscar..." value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} className="bg-transparent border-none outline-none text-white text-[13px] placeholder-white/30 w-full" />
          </div>
        )}
        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[10px]">
          <Checkbox label="Todo" checked={sel.length === 0} onChange={() => selectAllPending(field)} />
          {opts.map((o) => <Checkbox key={o} label={o} checked={sel.includes(o)} onChange={() => togglePendingSimple(field, o)} />)}
        </div>
        {renderPanelFooter(key)}
      </div>
    );
  }

  function renderPanelFooter(key: FilterKey) {
    return (
      <div className="flex items-center gap-[12px] pt-[10px] border-t border-white/10">
        <button type="button" onClick={() => clearPending(key)} className="text-white/40 hover:text-white text-[13px] transition-colors cursor-pointer">Borrar</button>
        <button type="button" onClick={applyFilters} className="flex-1 py-[10px] rounded-[10px] bg-white text-black text-[13px] font-medium cursor-pointer hover:bg-white/90 transition-colors">Aplicar</button>
      </div>
    );
  }

  function renderPanel() {
    if (!openPanel) return null;
    switch (openPanel) {
      case "project": return renderProjectPanel();
      case "brand": return renderSimplePanel("brand", "Marca", BRAND_OPTIONS, "brands");
      case "application": return renderSimplePanel("application", "Aplicaciones", APPLICATION_OPTIONS, "applications");
      case "style": return renderSimplePanel("style", "Estilo", STYLE_OPTIONS, "styles");
      case "country": return renderSimplePanel("country", "País", COUNTRY_OPTIONS, "countries", true);
    }
  }

  /* ── Sidebar ───────────────────────────────────────────────── */
  function renderSidebar() {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-black/20 transition-opacity duration-300" style={{ opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? "auto" : "none" }} onClick={closeSidebar} />
        <div className="fixed top-0 right-0 bottom-0 z-50 w-[440px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] flex flex-col transition-transform duration-300 ease-out" style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(100%)" }}>
          {sidebarView === "lists" && renderListsView()}
          {sidebarView === "save-item" && renderSaveItemView()}
          {sidebarView === "create" && renderCreateView()}
        </div>
      </>
    );
  }

  function renderListsView() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-[24px] pt-[28px] pb-[20px]">
          <h2 className="text-[18px] font-semibold text-black">Lista de guardados</h2>
          <button type="button" onClick={closeSidebar} className="w-[36px] h-[36px] rounded-full border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="black" strokeWidth="1.5" strokeLinecap="round" /></svg></button>
        </div>
        <div className="flex-1 overflow-y-auto px-[24px] pb-[24px]">
          <div className="flex flex-col gap-[8px]">
            {lists.map((list) => {
              const thumb = list.items[0];
              return (
                <button key={list.id} type="button" onClick={() => handleViewList(list.id)} className="flex items-center gap-[14px] p-[12px] rounded-[12px] border border-black/8 hover:bg-black/[0.02] transition-colors cursor-pointer text-left w-full">
                  {thumb ? (
                    <div className="w-[56px] h-[56px] rounded-[8px] overflow-hidden flex-shrink-0 bg-black/5"><Image src={`${basePath}${thumb}`} alt="" width={56} height={56} className="w-full h-full object-cover" /></div>
                  ) : <div className="w-[56px] h-[56px] rounded-[8px] bg-black/5 flex-shrink-0" />}
                  <div className="flex flex-col gap-[2px] min-w-0">
                    <span className="text-[14px] font-medium text-black truncate">{list.name}</span>
                    <span className="text-[12px] text-black/40">{timeAgo(list.updatedAt)}</span>
                  </div>
                  <span className="ml-auto text-[12px] text-black/30 flex-shrink-0">{list.items.length}</span>
                </button>
              );
            })}
            <button type="button" onClick={() => { setNewListName(""); setSavingSearchItems(null); setSidebarView("create"); }} className="flex items-center gap-[14px] p-[12px] rounded-[12px] border border-black/8 hover:bg-black/[0.02] transition-colors cursor-pointer text-left">
              <div className="w-[56px] h-[56px] rounded-[8px] bg-black/[0.04] flex-shrink-0 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="black" strokeWidth="1.5" strokeLinecap="round" /></svg></div>
              <div className="flex flex-col gap-[2px]"><span className="text-[14px] font-medium text-black">Nueva lista</span><span className="text-[12px] text-black/40">Guarda y comparte tu selección</span></div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderSaveItemView() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-[24px] pt-[28px] pb-[20px]">
          <h2 className="text-[18px] font-semibold text-black">Guardar en lista</h2>
          <button type="button" onClick={closeSidebar} className="w-[36px] h-[36px] rounded-full border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="black" strokeWidth="1.5" strokeLinecap="round" /></svg></button>
        </div>
        <div className="flex-1 overflow-y-auto px-[24px]">
          {lists.length === 0 && <p className="text-[13px] text-black/40 mb-[16px]">No tienes listas todavía. Crea una nueva.</p>}
          <div className="flex flex-col gap-[6px]">
            {lists.map((l) => <CheckboxLight key={l.id} label={l.name} checked={selectedListIds.includes(l.id)} onChange={() => setSelectedListIds((p) => p.includes(l.id) ? p.filter((x) => x !== l.id) : [...p, l.id])} />)}
          </div>
          <button type="button" onClick={() => { setNewListName(""); setSavingSearchItems(null); setSidebarView("create"); }} className="flex items-center gap-[10px] mt-[16px] text-[14px] text-black/50 hover:text-black cursor-pointer transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Nueva lista
          </button>
        </div>
        <div className="px-[24px] py-[20px] border-t border-black/8">
          <button type="button" onClick={handleConfirmSaveItem} className="w-full py-[12px] rounded-[10px] bg-black text-white text-[14px] font-medium cursor-pointer hover:bg-black/90 transition-colors">Confirmar</button>
        </div>
      </div>
    );
  }

  function renderCreateView() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-[24px] pt-[28px] pb-[20px]">
          <h2 className="text-[18px] font-semibold text-black">Crear nueva lista</h2>
          <button type="button" onClick={closeSidebar} className="w-[36px] h-[36px] rounded-full border border-black/10 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1L11 11M11 1L1 11" stroke="black" strokeWidth="1.5" strokeLinecap="round" /></svg></button>
        </div>
        <div className="flex-1 px-[24px]">
          <input type="text" placeholder="Añade un nombre a tu lista" value={newListName} onChange={(e) => setNewListName(e.target.value)} autoFocus className="w-full text-[15px] text-black placeholder-black/30 border-b border-black/15 pb-[12px] outline-none bg-transparent" />
        </div>
        <div className="px-[24px] py-[20px] flex flex-col gap-[10px]">
          <button type="button" onClick={() => { savingItemImage ? setSidebarView("save-item") : setSidebarView("lists"); }} className="w-full py-[12px] rounded-[10px] border border-black/15 text-black text-[14px] font-medium cursor-pointer hover:bg-black/5 transition-colors">Cancelar</button>
          <button type="button" onClick={handleCreateList} className="w-full py-[12px] rounded-[10px] bg-black text-white text-[14px] font-medium cursor-pointer hover:bg-black/90 transition-colors" style={{ opacity: newListName.trim() ? 1 : 0.4, pointerEvents: newListName.trim() ? "auto" : "none" }}>Guardar lista</button>
        </div>
      </div>
    );
  }

  /* ── Magazine layout ────────────────────────────────────────── */
  /* Card variants matching the Magazine page exactly */
  function MagSuper({ item }: { item: MasonryItem }) {
    return (
      <div
        style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw" }}
        className="relative h-screen overflow-hidden cursor-pointer group"
        onClick={() => { if (item.href) navigateTo(item.href); }}
      >
        <Image src={`${basePath}${item.image}`} alt="" fill className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center text-center px-[24px]">
            <p className="text-white text-[14px] font-normal" style={{ lineHeight: "22px", opacity: 0.8 }}>{item.brand}</p>
            <h2 className="mt-[8px] text-white text-[36px] md:text-[56px] font-medium" style={{ lineHeight: "normal" }}>{item.title}</h2>
            <p className="mt-[8px] text-white text-[14px] font-normal" style={{ lineHeight: "22px", opacity: 0.8 }}>{item.application}</p>
          </div>
        </div>
      </div>
    );
  }

  function MagCard({ item, className }: { item: MasonryItem; className?: string }) {
    return (
      <div className={`cursor-pointer group ${className ?? ""}`} onClick={() => { if (item.href) navigateTo(item.href); }}>
        <div className="w-full overflow-hidden" style={{ aspectRatio: "672 / 872" }}>
          <Image src={`${basePath}${item.image}`} alt="" width={672} height={872} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </div>
        <h3 className="mt-[12px] text-black text-[16px] font-normal transition-opacity duration-300 group-hover:opacity-60" style={{ lineHeight: "normal", letterSpacing: "-0.64px" }}>{item.title}</h3>
        <p className="mt-[4px] text-[14px] font-normal transition-opacity duration-300" style={{ color: "rgba(0,0,0,0.50)", lineHeight: "22px", letterSpacing: "-0.28px" }}>{item.brand} · {item.application}</p>
      </div>
    );
  }

  /*
    Magazine layout sequence (repeats every 5 cards, no hero):
    0 → mid   (col-start-4 col-span-5)
    1 → small (col-start-7 col-span-3)
    2 → big   (col-start-4 col-span-6)
    3 → small (col-start-3 col-span-3)
    4 → mid   (col-start-7 col-span-5)
  */
  function renderMagazine(items: MasonryItem[]) {
    const SEQUENCE = [
      "md:col-start-4 md:col-span-5 col-span-4",  // mid, center-left
      "md:col-start-7 md:col-span-3 col-span-4",  // small, right
      "md:col-start-4 md:col-span-6 col-span-4",  // big, centered
      "md:col-start-3 md:col-span-3 col-span-4",  // small, left
      "md:col-start-7 md:col-span-5 col-span-4",  // mid, right
    ];
    const blocks: React.ReactNode[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const colClass = SEQUENCE[i % SEQUENCE.length];
      blocks.push(
          <div key={`c-${i}`} className={i === 0 ? "" : "pt-[120px] md:pt-[180px]"}>
            <div className="grid-12">
              <div className={`${colClass} reveal`}>
                <MagCard item={item} />
              </div>
            </div>
          </div>,
        );
      }
    return <div>{blocks}</div>;
  }

  /* ── Bookmark button (reusable) ────────────────────────────── */
  function renderBookmark(image: string, saved: boolean) {
    return (
      <button type="button" onClick={(e) => { e.stopPropagation(); handleBookmark(image); }}
        className={`absolute top-[10px] right-[10px] w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${saved ? "bg-white/90 opacity-100" : "bg-black/30 backdrop-blur-[8px] opacity-0 group-hover:opacity-100"}`}>
        <svg width="14" height="17" viewBox="0 0 14 17" fill="none"><path d="M1 1.5h12v14l-6-3.5-6 3.5V1.5z" stroke={saved ? "black" : "white"} strokeWidth="1.3" fill={saved ? "black" : "none"} /></svg>
      </button>
    );
  }

  /* ══════════════════════════════════════════════════════════════
     RENDER
     ═════════════════════════════════════════════════════════════ */
  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden" ref={revealRef}>
      <Header dark withBg={subStuck && !viewingListId} />

      {/* ── Fixed sub-header: appears when in-flow bar scrolls away ── */}
      {!viewingListId && (
        <div
          className="fixed top-[66px] left-0 right-0 z-[45] h-[30px] bg-white flex items-center transition-all duration-200"
          style={{
            opacity: subStuck ? 1 : 0,
            boxShadow: subStuck ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            pointerEvents: subStuck ? "auto" : "none",
          }}
        >
          <div className="grid-container w-full">
            <div className="flex items-center justify-between">
              <p className="text-[12px] text-black/35 tracking-[0.02em]" style={{ fontWeight: 400 }}>
                Navegando {filteredItems.length} proyecto{filteredItems.length !== 1 ? "s" : ""} y galerías
              </p>
              <button type="button" onClick={openMisListas} className="text-[12px] text-black/35 hover:text-black/60 tracking-[0.02em] cursor-pointer transition-colors flex items-center gap-[5px]">
                <svg width="14" height="14" viewBox="0 0 16 20" fill="none" className="opacity-50"><path d="M1 1h14v18l-7-4-7 4V1z" stroke="currentColor" strokeWidth="1.3" /></svg>
                Mis listas{lists.length > 0 ? ` (${lists.length})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid-container pt-[120px] pb-[120px]" style={{ transition: "opacity 250ms ease", opacity: filtering ? 0 : 1 }}>

        {/* ── List detail view ──────────────────────────────────── */}
        {viewingListId && viewedList ? (
          <>
            {/* Header bar */}
            <div className="flex items-center justify-between mb-[32px]">
              <div className="flex items-center gap-[14px]">
                <button type="button" onClick={() => setViewingListId(null)} className="text-black/30 hover:text-black transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <h1 className="text-[22px] md:text-[28px] font-semibold tracking-tight text-black">{viewedList.name}</h1>
                <span className="text-[12px] text-black/30">{viewedList.items.length} proyecto{viewedList.items.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center gap-[14px]">
                {/* Grid / Magazine toggle */}
                <div className="flex rounded-full bg-black/[0.06] p-[3px]">
                  <button type="button" onClick={() => setListViewMode("grid")} className={`px-[14px] py-[5px] rounded-full text-[12px] transition-all duration-200 cursor-pointer ${listViewMode === "grid" ? "bg-white text-black shadow-sm font-medium" : "text-black/45"}`}>Grid</button>
                  <button type="button" onClick={() => setListViewMode("magazine")} className={`px-[14px] py-[5px] rounded-full text-[12px] transition-all duration-200 cursor-pointer ${listViewMode === "magazine" ? "bg-white text-black shadow-sm font-medium" : "text-black/45"}`}>Magazine</button>
                </div>
                {/* Share */}
                <button type="button" onClick={handleShareList} className="flex items-center gap-[6px] text-[12px] text-black/40 hover:text-black transition-colors cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 9.3a4 4 0 005.3-1L13 6.7a4 4 0 00-5.3-5.3L6.5 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 6.7a4 4 0 00-5.3 1L3 9.3a4 4 0 005.3 5.3l1.1-.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Compartir
                </button>
              </div>
            </div>

            {/* Content */}
            {viewedItems.length === 0 ? (
              <p className="text-[14px] text-black/40 py-[40px] text-center">Esta lista está vacía</p>
            ) : listViewMode === "magazine" ? (
              renderMagazine(viewedItems)
            ) : (
              <div className="masonry-grid">
                {viewedItems.map((item, i) => {
                  const saved = isItemSaved(item.image);
                  return (
                    <div key={item.image} className="masonry-item reveal" style={{ transitionDelay: `${Math.min(i * 60, 600)}ms` }}>
                      <div className="relative overflow-hidden rounded-[4px] cursor-pointer group" onClick={() => { if (item.href) navigateTo(item.href); }}>
                        <Image src={`${basePath}${item.image}`} alt="" width={800} height={600} sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-[16px] md:p-[20px]">
                          <h3 className="text-white text-[14px] md:text-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[8px] group-hover:translate-y-0" style={{ lineHeight: "normal", letterSpacing: "-0.32px", transition: "opacity 500ms ease, transform 500ms ease" }}>{item.title}</h3>
                        </div>
                        {renderBookmark(item.image, saved)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          /* ── Normal browse view ──────────────────────────────── */
          <>
            {/* In-flow info bar — fades out when fixed clone takes over */}
            <div ref={subSentinelRef} className="flex items-center justify-between mb-[16px] transition-opacity duration-150" style={{ opacity: subStuck ? 0 : 1 }}>
              <p className="text-[12px] text-black/35 tracking-[0.02em]" style={{ fontWeight: 400 }}>
                Navegando {filteredItems.length} proyecto{filteredItems.length !== 1 ? "s" : ""} y galerías
              </p>
              <button type="button" onClick={openMisListas} className="text-[12px] text-black/35 hover:text-black/60 tracking-[0.02em] cursor-pointer transition-colors flex items-center gap-[5px]">
                <svg width="14" height="14" viewBox="0 0 16 20" fill="none" className="opacity-50"><path d="M1 1h14v18l-7-4-7 4V1z" stroke="currentColor" strokeWidth="1.3" /></svg>
                Mis listas{lists.length > 0 ? ` (${lists.length})` : ""}
              </button>
            </div>

            <div className="masonry-grid">
              {filteredItems.map((item, i) => {
                const saved = isItemSaved(item.image);
                return (
                  <div key={`${item.image}-${filterKey}`} className="masonry-item reveal" style={{ transitionDelay: `${Math.min(i * 60, 600)}ms` }}>
                    <div className="relative overflow-hidden rounded-[4px] cursor-pointer group" onClick={() => { if (item.href) navigateTo(item.href); }}>
                      <Image src={`${basePath}${item.image}`} alt="" width={800} height={600} sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-end p-[16px] md:p-[20px]">
                        <h3 className="text-white text-[14px] md:text-[16px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[8px] group-hover:translate-y-0" style={{ lineHeight: "normal", letterSpacing: "-0.32px", transition: "opacity 500ms ease, transform 500ms ease" }}>{item.title}</h3>
                      </div>
                      {renderBookmark(item.image, saved)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-[12px] text-white text-[13px] px-[20px] py-[8px] rounded-full animate-[fadeSlideIn_300ms_ease] whitespace-nowrap">
          {toastMsg || "Búsqueda temporalmente no disponible"}
        </div>
      )}

      {/* Bottom floating nav */}
      <div className="fixed bottom-[20px] left-0 right-0 z-40 flex flex-col items-center" ref={pillRef}>
        {openPanel && <div className="mb-[8px]" style={{ animation: "panelIn 200ms ease forwards" }}>{renderPanel()}</div>}

        <div className="flex items-center gap-[14px] px-[28px] pt-[12px] pb-[11px] rounded-[72px] backdrop-blur-[36px] bg-black/[0.46] text-white text-[14px] font-normal whitespace-nowrap transition-all duration-500" style={{ lineHeight: "normal" }}
          onMouseLeave={() => { if (searchMode) searchTimeoutRef.current = setTimeout(() => setSearchMode(false), 5000); }}
          onMouseEnter={() => { if (searchTimeoutRef.current) { clearTimeout(searchTimeoutRef.current); searchTimeoutRef.current = null; } }}>

          <button className="cursor-pointer transition-opacity duration-300" style={{ opacity: 0.5 }} onClick={() => navigateTo("/prototipo")}>Magazine</button>
          <button className="font-medium cursor-pointer" onClick={() => setViewingListId(null)}>Encuentra</button>

          <button onClick={() => { setSearchMode(!searchMode); setOpenPanel(null); }} className="cursor-pointer transition-opacity duration-300 opacity-60 hover:opacity-100 shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5.5" cy="5.5" r="4.75" stroke="white" strokeWidth="1" /><line x1="9" y1="9" x2="13" y2="13" stroke="white" strokeWidth="1" /></svg>
          </button>

          {searchMode ? (
            <>
              <input type="text" placeholder="¿Qué estás buscando?" className="bg-transparent border-none outline-none text-white text-[14px] placeholder-white/40 w-[240px]" autoFocus />
              <button className="cursor-pointer text-white/60 hover:text-white transition-colors duration-300 text-[14px] shrink-0" onClick={() => { setSearchMode(false); toast("Búsqueda temporalmente no disponible"); }}>Buscar</button>
            </>
          ) : (
            <>
              <div className="w-[1px] h-[14px] bg-white/20" />
              {FILTER_BUTTONS.map((fb) => {
                const c = getCount(fb.key); const isO = openPanel === fb.key;
                return (
                  <button key={fb.key} type="button" onClick={() => openFilterPanel(fb.key)} className="cursor-pointer transition-opacity duration-300 flex items-center gap-[5px]" style={{ opacity: c > 0 || isO ? 1 : 0.55 }}>
                    <span>{fb.label}</span>
                    {c > 0 && <span className="text-[11px] opacity-70">({c})</span>}
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="opacity-40" style={{ transform: isO ? "rotate(180deg)" : undefined, transition: "transform 200ms ease" }}><path d="M1 1L4 4L7 1" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                );
              })}
              {totalFilterCount > 0 && (
                <>
                  <div className="w-[1px] h-[14px] bg-white/20" />
                  <button type="button" onClick={clearAllFilters} className="cursor-pointer text-white/45 hover:text-white text-[13px] transition-colors duration-300 flex items-center gap-[4px]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                    Limpiar
                  </button>
                  <div className="w-[1px] h-[14px] bg-white/20" />
                  <button type="button" onClick={handleSaveSearch} className="cursor-pointer text-white/55 hover:text-white text-[13px] transition-colors duration-300 flex items-center gap-[5px]">
                    <svg width="12" height="15" viewBox="0 0 14 17" fill="none"><path d="M1 1.5h12v14l-6-3.5-6 3.5V1.5z" stroke="currentColor" strokeWidth="1.2" /></svg>
                    Guardar búsqueda
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {renderSidebar()}

      <style jsx>{`
        @keyframes panelIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
