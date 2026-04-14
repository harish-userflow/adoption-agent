import { useState, useRef, useEffect } from "react";

const T = {
  bg: "#F7F8FC",
  card: "#FFF",
  brd: "#E5E7EB",
  txt: "#0D1117",
  mut: "#6B7280",
  pri: "#5B5FC7",
  priL: "#EEEEFF",
  priT: "#3730A3",
  g: "#10B981",
  gL: "#D1FAE5",
  gT: "#065F46",
  a: "#F59E0B",
  aL: "#FEF3C7",
  aT: "#92400E",
  r: "#EF4444",
  rL: "#FEE2E2",
  rT: "#991B1B",
  sb: "#0D1117",
  sbBrd: "rgba(255,255,255,0.07)",
};

const Tag = ({ c = "gray", children }) => {
  const m = {
    green: { bg: T.gL, col: T.gT },
    amber: { bg: T.aL, col: T.aT },
    red: { bg: T.rL, col: T.rT },
    indigo: { bg: T.priL, col: T.priT },
    blue: { bg: "#DBEAFE", col: "#1E40AF" },
    purple: { bg: "#EDE9FE", col: "#5B21B6" },
    gray: { bg: "#F3F4F6", col: "#374151" },
  };
  const s = m[c] || m.gray;
  return (
    <span
      style={{
        background: s.bg,
        color: s.col,
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

const Btn = ({
  children,
  v = "out",
  sz = "md",
  onClick,
  disabled,
  full,
  style = {},
}) => {
  const vs = {
    pri: { background: T.pri, color: "#fff", border: "none" },
    out: { background: "#fff", color: T.txt, border: `1px solid ${T.brd}` },
    ghost: { background: "transparent", color: T.mut, border: "none" },
    suc: { background: T.g, color: "#fff", border: "none" },
    soft: { background: T.priL, color: T.pri, border: "none" },
    dan: { background: T.r, color: "#fff", border: "none" },
  };
  const ss = {
    sm: { fontSize: 12, padding: "5px 12px", borderRadius: 6 },
    md: { fontSize: 13, padding: "8px 16px", borderRadius: 7 },
    lg: { fontSize: 15, padding: "12px 26px", borderRadius: 8 },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontWeight: 500,
        width: full ? "100%" : undefined,
        ...vs[v],
        ...ss[sz],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, ...props }) => (
  <div
    {...props}
    style={{
      background: T.card,
      border: `1px solid ${T.brd}`,
      borderRadius: 12,
      ...style,
    }}
  >
    {children}
  </div>
);

// ── static data ────────────────────────────────────────────────────
const HISTORY = [
  { id: 1, title: "Improve onboarding completion", date: "Today" },
  { id: 2, title: "Reduce support tickets", date: "Yesterday" },
  { id: 3, title: "Trial to paid conversion", date: "Apr 7" },
];

const NUDGES = [
  { icon: "◈", label: "Drive feature adoption" },
  { icon: "◉", label: "Reduce support tickets" },
  { icon: "◆", label: "Improve onboarding completion" },
  { icon: "▷", label: "Convert trials to paid" },
];

const SOURCE_CATEGORIES = [
  {
    id: "kb",
    label: "Knowledge base",
    icon: "📚",
    desc: "Help articles, docs, support content",
    options: [
      {
        id: "zendesk",
        label: "Zendesk",
        fields: [
          {
            key: "subdomain",
            label: "Subdomain",
            placeholder: "yourco.zendesk.com",
          },
        ],
      },
      {
        id: "intercom",
        label: "Intercom Articles",
        fields: [
          { key: "workspace", label: "Workspace ID", placeholder: "abc123xyz" },
        ],
      },
      {
        id: "website",
        label: "Website / Docs",
        fields: [
          {
            key: "url",
            label: "URL",
            placeholder: "https://docs.yourproduct.com",
          },
        ],
      },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: "🤝",
    desc: "Customer data, company info, user attributes",
    options: [
      {
        id: "hubspot",
        label: "HubSpot",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "pat-na1-xxxxxxxx" },
        ],
      },
      {
        id: "salesforce",
        label: "Salesforce CRM",
        fields: [
          {
            key: "instance",
            label: "Instance URL",
            placeholder: "https://yourorg.salesforce.com",
          },
        ],
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    desc: "Usage data, events, behavioural signals",
    options: [
      {
        id: "mixpanel",
        label: "Mixpanel",
        fields: [
          { key: "token", label: "Project Token", placeholder: "abc123def456" },
        ],
      },
      {
        id: "amplitude",
        label: "Amplitude",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "xxxxxxxxxxxxxxxx" },
        ],
      },
    ],
  },
];

const STATIC_SOURCES = [
  {
    id: "bp_new",
    name: "Acme SaaS — Production blueprint",
    type: "blueprint",
    icon: "◈",
    color: T.pri,
    colorL: T.priL,
    created: "Apr 10, 2026",
    usedBy: ["Onboarding Agent"],
    status: "ready",
    detail: "18 actions · 7 sections · app.acme.com",
  },
  {
    id: "kb1",
    name: "Zendesk Help Center",
    type: "knowledge_base",
    icon: "📚",
    color: "#F59E0B",
    colorL: "#FEF3C7",
    created: "Apr 6, 2026",
    usedBy: ["Onboarding Agent"],
    status: "synced",
    detail: "247 articles · last synced 2h ago",
  },
  {
    id: "crm1",
    name: "HubSpot CRM",
    type: "crm",
    icon: "🤝",
    color: T.g,
    colorL: T.gL,
    created: "Apr 2, 2026",
    usedBy: ["Trial Conversion Agent"],
    status: "synced",
    detail: "4,821 contacts · synced daily",
  },
];

const STATIC_AGENTS = [
  {
    id: "ag2",
    name: "Trial Conversion Agent",
    goal: "Convert trial users to paid within 14 days",
    status: "live",
    convs: 312,
    actions: 67,
    sources: ["crm1"],
  },
  {
    id: "ag3",
    name: "Support Deflection Agent",
    goal: "Reduce support ticket volume",
    status: "draft",
    convs: 0,
    actions: 0,
    sources: [],
  },
];

// ── Sidebar ────────────────────────────────────────────────────────
function Sidebar({ view, setView, collapsed, setCollapsed }) {
  const nav = [
    { id: "chats", label: "Chats", icon: "💬" },
    { id: "agents", label: "Adoption Agent", icon: "◎" },
    { id: "sources", label: "Sources", icon: "◈" },
  ];
  const w = collapsed ? 52 : 220;
  return (
    <div
      style={{
        width: w,
        background: T.sb,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.2s",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 10px 12px",
          borderBottom: `1px solid ${T.sbBrd}`,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                background: T.pri,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>
                U
              </span>
            </div>
            <div>
              <div style={{ color: "#E6EDF3", fontSize: 12, fontWeight: 700 }}>
                Userflow
              </div>
              <div
                style={{
                  color: T.pri,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                AGENTIC
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: 5,
            color: "#9CA3AF",
            cursor: "pointer",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>
      <nav style={{ padding: "8px 6px" }}>
        {nav.map((n) => (
          <div
            key={n.id}
            onClick={() => setView(n.id)}
            title={collapsed ? n.label : ""}
            style={{
              display: "flex",
              alignItems: "center",
              gap: collapsed ? 0 : 8,
              padding: collapsed ? "8px 0" : "7px 10px",
              borderRadius: 7,
              cursor: "pointer",
              marginBottom: 2,
              justifyContent: collapsed ? "center" : "flex-start",
              background: view === n.id ? "rgba(91,95,199,0.2)" : "transparent",
              color: view === n.id ? "#E0E1FF" : "#9CA3AF",
            }}
          >
            <span style={{ fontSize: 14 }}>{n.icon}</span>
            {!collapsed && <span style={{ fontSize: 13 }}>{n.label}</span>}
          </div>
        ))}
      </nav>
      {!collapsed && view === "chats" && (
        <div style={{ padding: "4px 6px", flex: 1, overflow: "auto" }}>
          <div
            style={{
              fontSize: 10,
              color: "#4B5563",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "8px 8px 4px",
              fontWeight: 700,
            }}
          >
            Recent
          </div>
          {HISTORY.map((h) => (
            <div
              key={h.id}
              style={{
                padding: "7px 10px",
                borderRadius: 7,
                cursor: "pointer",
                marginBottom: 1,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#D1D5DB",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {h.title}
              </div>
              <div style={{ fontSize: 10, color: "#4B5563", marginTop: 1 }}>
                {h.date}
              </div>
            </div>
          ))}
        </div>
      )}
      {!collapsed && (
        <div
          style={{
            padding: "10px 12px",
            borderTop: `1px solid ${T.sbBrd}`,
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#1F2937",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#9CA3AF",
                fontWeight: 700,
              }}
            >
              AC
            </div>
            <div style={{ color: "#E6EDF3", fontSize: 12, fontWeight: 500 }}>
              Acme Corp
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Source picker in chat ──────────────────────────────────────────
function SourcePicker() {
  const [sel, setSel] = useState(null);
  const [option, setOption] = useState(null);
  const [connected, setConnected] = useState([]);
  const cat = SOURCE_CATEGORIES.find((c) => c.id === sel);
  const opt = cat?.options.find((o) => o.id === option);

  const connect = () => {
    const label = opt?.label;
    const icon = cat?.icon;
    setConnected((c) => [...c, { id: option, label, icon }]);
    setSel(null);
    setOption(null);
  };

  return (
    <div
      style={{
        marginTop: 10,
        background: "#F9FAFB",
        border: `1px solid ${T.brd}`,
        borderRadius: 10,
        padding: "14px 16px",
        maxWidth: 420,
      }}
    >
      {connected.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 7,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {connected.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: T.gL,
                border: `1px solid ${T.g}40`,
                borderRadius: 7,
                padding: "4px 10px",
              }}
            >
              <span style={{ fontSize: 12 }}>{c.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.gT }}>
                {c.label} ✓
              </span>
            </div>
          ))}
        </div>
      )}
      {!sel && (
        <>
          <div style={{ fontSize: 12, color: T.mut, marginBottom: 10 }}>
            Connect additional context to make the agent smarter. Add as many as
            you need.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {SOURCE_CATEGORIES.map((c) => (
              <div
                key={c.id}
                onClick={() => setSel(c.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${T.brd}`,
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 16 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: 11, color: T.mut }}>{c.desc}</div>
                </div>
                <span style={{ color: T.mut }}>›</span>
              </div>
            ))}
          </div>
        </>
      )}
      {sel && !option && cat && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <button
              onClick={() => setSel(null)}
              style={{
                background: "none",
                border: "none",
                color: T.mut,
                cursor: "pointer",
                fontSize: 13,
                padding: 0,
              }}
            >
              ←
            </button>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
              {cat.icon} {cat.label}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {cat.options.map((o) => (
              <div
                key={o.id}
                onClick={() => setOption(o.id)}
                style={{
                  padding: "9px 12px",
                  borderRadius: 7,
                  border: `1px solid ${T.brd}`,
                  background: "white",
                  cursor: "pointer",
                  fontSize: 13,
                  color: T.txt,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {o.label}
                <span style={{ color: T.mut }}>›</span>
              </div>
            ))}
          </div>
        </>
      )}
      {sel && option && opt && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <button
              onClick={() => setOption(null)}
              style={{
                background: "none",
                border: "none",
                color: T.mut,
                cursor: "pointer",
                fontSize: 13,
                padding: 0,
              }}
            >
              ←
            </button>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
              {opt.label}
            </span>
          </div>
          {opt.fields.map((f) => (
            <div key={f.key} style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.txt,
                  marginBottom: 5,
                }}
              >
                {f.label}
              </div>
              <input
                placeholder={f.placeholder}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: `1px solid ${T.brd}`,
                  borderRadius: 7,
                  padding: "8px 11px",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn v="pri" sz="sm" onClick={connect}>
              Connect
            </Btn>
            <Btn v="ghost" sz="sm" onClick={() => setOption(null)}>
              Back
            </Btn>
          </div>
        </>
      )}
    </div>
  );
}

// ── Add Source modal ───────────────────────────────────────────────
function AddSourceModal({ onClose, onAdd }) {
  const [step, setStep] = useState("category");
  const [category, setCategory] = useState(null);
  const [subOption, setSubOption] = useState(null);
  const [url, setUrl] = useState("https://app.acme.com");
  const [auth, setAuth] = useState("password");
  const [bpProg, setBpProg] = useState(0);
  const [bpDone, setBpDone] = useState(false);
  const crawlRef = useRef(null);
  const [fieldVals, setFieldVals] = useState({});

  const CATEGORIES = [
    {
      id: "blueprint",
      label: "Blueprint",
      icon: "◈",
      desc: "Crawl your app to map all user paths and actions",
      color: T.pri,
      colorL: T.priL,
    },
    {
      id: "kb",
      label: "Knowledge base",
      icon: "📚",
      desc: "Help articles, docs and support content",
      color: "#F59E0B",
      colorL: "#FEF3C7",
    },
    {
      id: "crm",
      label: "CRM",
      icon: "🤝",
      desc: "Customer data, company info, user attributes",
      color: T.g,
      colorL: T.gL,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "📊",
      desc: "Usage data, events and behavioural signals",
      color: "#8B5CF6",
      colorL: "#EDE9FE",
    },
  ];

  const OPTIONS = {
    kb: [
      {
        id: "zendesk",
        label: "Zendesk",
        fields: [
          {
            key: "subdomain",
            label: "Subdomain",
            placeholder: "yourco.zendesk.com",
          },
        ],
      },
      {
        id: "intercom",
        label: "Intercom",
        fields: [
          { key: "workspace", label: "Workspace ID", placeholder: "abc123xyz" },
        ],
      },
      {
        id: "website",
        label: "Website / Docs URL",
        fields: [
          {
            key: "url",
            label: "URL",
            placeholder: "https://docs.yourproduct.com",
          },
        ],
      },
      {
        id: "salesforce_kb",
        label: "Salesforce Knowledge",
        fields: [
          {
            key: "instance",
            label: "Instance URL",
            placeholder: "https://yourorg.salesforce.com",
          },
        ],
      },
    ],
    crm: [
      {
        id: "hubspot",
        label: "HubSpot",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "pat-na1-xxxxxxxx" },
        ],
      },
      {
        id: "salesforce_crm",
        label: "Salesforce CRM",
        fields: [
          {
            key: "instance",
            label: "Instance URL",
            placeholder: "https://yourorg.salesforce.com",
          },
        ],
      },
      {
        id: "segment",
        label: "Segment",
        fields: [
          {
            key: "write_key",
            label: "Write Key",
            placeholder: "xxxxxxxxxxxxxxxx",
          },
        ],
      },
    ],
    analytics: [
      {
        id: "mixpanel",
        label: "Mixpanel",
        fields: [
          { key: "token", label: "Project Token", placeholder: "abc123def456" },
        ],
      },
      {
        id: "amplitude",
        label: "Amplitude",
        fields: [
          { key: "api_key", label: "API Key", placeholder: "xxxxxxxxxxxxxxxx" },
        ],
      },
      {
        id: "heap",
        label: "Heap",
        fields: [{ key: "app_id", label: "App ID", placeholder: "1234567890" }],
      },
    ],
  };

  const startCrawl = () => {
    setStep("crawling");
    setBpProg(1);
    crawlRef.current = setInterval(() => {
      setBpProg((p) => Math.min(p + 2, 100));
    }, 200);
  };

  useEffect(() => {
    if (bpProg >= 100 && step === "crawling") {
      clearInterval(crawlRef.current);
      setTimeout(() => {
        setBpDone(true);
        setStep("bp_done");
      }, 300);
    }
  }, [bpProg]);

  const opt = OPTIONS[category]?.find((o) => o.id === subOption);
  const cat = CATEGORIES.find((c) => c.id === category);

  const handleAdd = () => {
    if (category === "blueprint") {
      onAdd({
        id: `bp_${Date.now()}`,
        name: "New App Blueprint",
        type: "blueprint",
        icon: "◈",
        color: T.pri,
        colorL: T.priL,
        created: "Today",
        usedBy: [],
        status: "ready",
        detail: "18 actions · 7 sections",
      });
    } else if (opt) {
      const colorMap = {
        kb: { color: "#F59E0B", colorL: "#FEF3C7" },
        crm: { color: T.g, colorL: T.gL },
        analytics: { color: "#8B5CF6", colorL: "#EDE9FE" },
      };
      const cm = colorMap[category] || {};
      onAdd({
        id: `src_${Date.now()}`,
        name: opt.label,
        type: category,
        icon: cat?.icon,
        ...cm,
        created: "Today",
        usedBy: [],
        status: "synced",
        detail: "Connected · syncing",
      });
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.card,
          borderRadius: 14,
          width: 480,
          maxHeight: "80vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* header */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: `1px solid ${T.brd}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.txt }}>
              Add source
            </div>
            <div style={{ fontSize: 12, color: T.mut, marginTop: 2 }}>
              {step === "category" && "Choose the type of source to connect"}
              {step === "blueprint_url" && "Provide your app URL"}
              {step === "blueprint_auth" && "How should we authenticate?"}
              {step === "crawling" && "Crawling your app..."}
              {step === "bp_done" && "Blueprint ready"}
              {(step === "integration" || step === "int_config") &&
                `Connect ${cat?.label}`}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: T.mut,
              cursor: "pointer",
              fontSize: 20,
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
          {/* category picker */}
          {step === "category" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setStep(
                      c.id === "blueprint" ? "blueprint_url" : "integration"
                    );
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: `1px solid ${T.brd}`,
                    cursor: "pointer",
                    background: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = T.pri)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = T.brd)
                  }
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: c.colorL,
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, color: T.txt }}
                    >
                      {c.label}
                    </div>
                    <div style={{ fontSize: 12, color: T.mut, marginTop: 2 }}>
                      {c.desc}
                    </div>
                  </div>
                  <span style={{ color: T.mut, fontSize: 16 }}>›</span>
                </div>
              ))}
            </div>
          )}

          {/* blueprint url */}
          {step === "blueprint_url" && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: T.txt,
                    marginBottom: 5,
                  }}
                >
                  App URL
                </div>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: `1px solid ${T.brd}`,
                    borderRadius: 7,
                    padding: "9px 12px",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn v="pri" sz="md" onClick={() => setStep("blueprint_auth")}>
                  Continue
                </Btn>
                <Btn v="ghost" sz="md" onClick={() => setStep("category")}>
                  Back
                </Btn>
              </div>
            </div>
          )}

          {/* blueprint auth */}
          {step === "blueprint_auth" && (
            <div>
              <div style={{ fontSize: 12, color: T.mut, marginBottom: 12 }}>
                How should the crawler authenticate with <strong>{url}</strong>?
              </div>
              {[
                ["password", "Username & password"],
                ["oauth", "OAuth / SSO"],
                ["token", "API token"],
              ].map(([k, l]) => (
                <div
                  key={k}
                  onClick={() => {
                    setAuth(k);
                    if (k === "oauth") startCrawl();
                    else setStep("blueprint_creds");
                  }}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: `1.5px solid ${auth === k ? T.pri : T.brd}`,
                    background: auth === k ? T.priL : "white",
                    cursor: "pointer",
                    fontSize: 13,
                    color: T.txt,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {l}
                  <span style={{ color: T.mut }}>›</span>
                </div>
              ))}
              <Btn v="ghost" sz="sm" onClick={() => setStep("blueprint_url")}>
                Back
              </Btn>
            </div>
          )}

          {/* blueprint credentials */}
          {step === "blueprint_creds" && (
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.txt,
                      marginBottom: 5,
                    }}
                  >
                    Email / Username
                  </div>
                  <input
                    defaultValue="admin@acme.com"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      border: `1px solid ${T.brd}`,
                      borderRadius: 7,
                      padding: "9px 12px",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.txt,
                      marginBottom: 5,
                    }}
                  >
                    Password
                  </div>
                  <input
                    type="password"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      border: `1px solid ${T.brd}`,
                      borderRadius: 7,
                      padding: "9px 12px",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 11, color: T.mut, marginBottom: 14 }}>
                🔒 Not stored after this session.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn v="pri" sz="md" onClick={startCrawl}>
                  Start crawling
                </Btn>
                <Btn
                  v="ghost"
                  sz="md"
                  onClick={() => setStep("blueprint_auth")}
                >
                  Back
                </Btn>
              </div>
            </div>
          )}

          {/* crawling */}
          {(step === "crawling" || step === "bp_done") && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: bpDone ? T.gT : T.priT,
                  }}
                >
                  {bpDone ? "Blueprint ready" : "Crawling " + url + "..."}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: bpDone ? T.g : T.pri,
                  }}
                >
                  {bpProg}%
                </span>
              </div>
              <div
                style={{
                  background: T.brd,
                  borderRadius: 5,
                  height: 7,
                  marginBottom: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: bpDone ? T.g : T.pri,
                    height: "100%",
                    borderRadius: 5,
                    width: `${bpProg}%`,
                    transition: "width 0.18s linear",
                  }}
                />
              </div>
              {bpDone && (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    {[
                      ["18", "Actions", T.pri, T.priL],
                      ["7", "Sections", T.g, T.gL],
                      ["1", "Blocked", T.a, T.aL],
                    ].map(([v, l, c, bg], i) => (
                      <div
                        key={i}
                        style={{
                          background: bg,
                          borderRadius: 8,
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{ fontSize: 20, fontWeight: 700, color: c }}
                        >
                          {v}
                        </div>
                        <div style={{ fontSize: 11, color: T.mut }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <Btn v="suc" sz="md" onClick={handleAdd}>
                    Save blueprint to Sources
                  </Btn>
                </>
              )}
            </div>
          )}

          {/* integration picker */}
          {step === "integration" && category && OPTIONS[category] && (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <button
                  onClick={() => setStep("category")}
                  style={{
                    background: "none",
                    border: "none",
                    color: T.mut,
                    cursor: "pointer",
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  ← Back
                </button>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
                  {cat?.icon} {cat?.label}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {OPTIONS[category].map((o) => (
                  <div
                    key={o.id}
                    onClick={() => {
                      setSubOption(o.id);
                      setStep("int_config");
                    }}
                    style={{
                      padding: "11px 14px",
                      borderRadius: 9,
                      border: `1px solid ${T.brd}`,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      color: T.txt,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "white",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = T.pri)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = T.brd)
                    }
                  >
                    {o.label}
                    <span style={{ color: T.mut }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* integration config */}
          {step === "int_config" && opt && (
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <button
                  onClick={() => setStep("integration")}
                  style={{
                    background: "none",
                    border: "none",
                    color: T.mut,
                    cursor: "pointer",
                    fontSize: 13,
                    padding: 0,
                  }}
                >
                  ← Back
                </button>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.txt }}>
                  {opt.label}
                </span>
              </div>
              {opt.fields.map((f) => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: T.txt,
                      marginBottom: 5,
                    }}
                  >
                    {f.label}
                  </div>
                  <input
                    placeholder={f.placeholder}
                    value={fieldVals[f.key] || ""}
                    onChange={(e) =>
                      setFieldVals((v) => ({ ...v, [f.key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      border: `1px solid ${T.brd}`,
                      borderRadius: 7,
                      padding: "9px 12px",
                      fontSize: 13,
                      outline: "none",
                    }}
                  />
                </div>
              ))}
              <div
                style={{
                  background: T.gL,
                  border: `1px solid ${T.g}30`,
                  borderRadius: 8,
                  padding: "9px 12px",
                  fontSize: 12,
                  color: T.gT,
                  marginBottom: 16,
                }}
              >
                Your credentials are encrypted and used only to sync content.
              </div>
              <Btn v="pri" sz="md" onClick={handleAdd}>
                Connect {opt.label}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Blueprint panel ────────────────────────────────────────────────
function BlueprintPanel({ onOpenAgent }) {
  const [tab, setTab] = useState("actions");
  const ACTIONS = [
    { name: "Invite team member", section: "Settings / Team", steps: 4 },
    { name: "Remove team member", section: "Settings / Team", steps: 3 },
    { name: "Change member role", section: "Settings / Team", steps: 2 },
    { name: "Connect Slack", section: "Integrations", steps: 5 },
    { name: "Generate API key", section: "Integrations", steps: 3 },
    { name: "Create project", section: "Projects", steps: 3 },
    { name: "Archive project", section: "Projects", steps: 2 },
    { name: "Export report as CSV", section: "Reports", steps: 5 },
    { name: "Schedule report", section: "Reports", steps: 4 },
    { name: "Update billing", section: "Billing", steps: 3 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: T.priL,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ◈
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.txt }}>
              Acme SaaS Blueprint
            </div>
            <div style={{ fontSize: 11, color: T.mut }}>
              app.acme.com · Apr 10, 2026
            </div>
          </div>
          <Tag c="green">Ready</Tag>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
          }}
        >
          {[
            ["18", "Actions", T.pri, T.priL],
            ["7", "Sections", T.g, T.gL],
            ["1", "Blocked", T.a, T.aL],
          ].map(([v, l, c, bg], i) => (
            <div
              key={i}
              style={{
                background: bg,
                borderRadius: 7,
                padding: "8px 10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: c }}>{v}</div>
              <div style={{ fontSize: 10, color: T.mut }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        {[
          ["actions", "Actions"],
          ["blocked", "Blocked"],
          ["settings", "Settings"],
        ].map(([k, l]) => (
          <div
            key={k}
            onClick={() => setTab(k)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              color: tab === k ? T.pri : T.mut,
              borderBottom:
                tab === k ? `2px solid ${T.pri}` : "2px solid transparent",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tab === "actions" &&
          ACTIONS.map((a, i) => (
            <div
              key={i}
              style={{
                padding: "10px 18px",
                borderBottom: `1px solid ${T.brd}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: T.g,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.txt }}>
                  {a.name}
                </div>
                <div style={{ fontSize: 11, color: T.mut }}>
                  {a.section} · {a.steps} steps
                </div>
              </div>
              <Tag c="green">Mapped</Tag>
            </div>
          ))}
        {tab === "blocked" && (
          <div style={{ padding: "16px 18px" }}>
            <div
              style={{
                background: T.aL,
                border: `1px solid ${T.a}40`,
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: T.aT,
                  marginBottom: 3,
                }}
              >
                Admin panel · /admin
              </div>
              <div style={{ fontSize: 12, color: T.aT, marginBottom: 10 }}>
                Crawler was redirected — elevated role required.
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn v="out" sz="sm">
                  Provide credentials
                </Btn>
                <Btn v="ghost" sz="sm">
                  Skip
                </Btn>
              </div>
            </div>
          </div>
        )}
        {tab === "settings" && (
          <div style={{ padding: "16px 18px" }}>
            {[
              ["Blueprint name", "Acme SaaS — Production"],
              ["App URL", "https://app.acme.com"],
              ["Auth method", "Username & password"],
              ["Last crawled", "Apr 10, 2026"],
            ].map(([l, v], i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: T.mut,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {l}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: T.txt,
                    background: "#F9FAFB",
                    borderRadius: 7,
                    padding: "8px 11px",
                    border: `1px solid ${T.brd}`,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
            <Btn v="out" sz="sm">
              Re-crawl
            </Btn>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "14px 18px",
          borderTop: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        <Btn v="pri" sz="md" full onClick={onOpenAgent}>
          Create adoption agent →
        </Btn>
      </div>
    </div>
  );
}

// ── Widget preview ─────────────────────────────────────────────────
function WidgetPreview() {
  const [subTab, setSubTab] = useState("preview");
  const [wOpen, setWOpen] = useState(true);
  const [wMsgs, setWMsgs] = useState([
    { r: "a", t: "Hi! How can I help you today?" },
  ]);
  const [wInput, setWInput] = useState("");
  const [wStep, setWStep] = useState("idle");
  const [wName, setWName] = useState("");
  const wRef = useRef();

  const [cfg, setCfg] = useState({
    accentColor: "#5B5FC7",
    bgColor: "#1E293B",
    headerText: "Acme Help",
    subText: "Onboarding Agent",
    rounded: "lg",
    fontSize: "md",
    position: "bottom-right",
    launcherIcon: "chat",
    launcherSize: "md",
    showBranding: true,
  });
  const [css, setCss] = useState(
    `.uf-widget { font-family: 'Inter', sans-serif; }\n.uf-widget-header { background: #5B5FC7; }\n.uf-bubble-agent { background: #334155; color: #E2E8F0; }\n.uf-bubble-user { background: #5B5FC7; color: white; }`
  );

  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));
  const radii = { sm: 6, md: 10, lg: 16 };
  const fontSizes = { sm: 11, md: 12, lg: 14 };
  const r = radii[cfg.rounded];
  const fs = fontSizes[cfg.fontSize];

  useEffect(() => {
    if (wRef.current) wRef.current.scrollTop = wRef.current.scrollHeight;
  }, [wMsgs]);

  const wSend = () => {
    if (!wInput.trim()) return;
    const q = wInput;
    setWInput("");
    setWMsgs((m) => [...m, { r: "u", t: q }]);
    setTimeout(() => {
      if (wStep === "idle") {
        setWStep("name");
        setWMsgs((m) => [
          ...m,
          { r: "a", t: "I can do that right now. What's their full name?" },
        ]);
      } else if (wStep === "name") {
        setWName(q);
        setWStep("email");
        setWMsgs((m) => [
          ...m,
          { r: "a", t: `Got it — ${q}. What's their email?` },
        ]);
      } else if (wStep === "email") {
        setWStep("done");
        setWMsgs((m) => [
          ...m,
          { r: "suc", t: `Done! ${wName} has been invited.` },
        ]);
      }
    }, 500);
  };

  const SWATCHES = [
    "#5B5FC7",
    "#10B981",
    "#EF4444",
    "#F59E0B",
    "#0D1117",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];

  const Seg = ({ options, val, onChange }) => (
    <div style={{ display: "flex", gap: 4 }}>
      {options.map(([v, l]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          style={{
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 600,
            border: `1px solid ${T.brd}`,
            borderRadius: 5,
            background: val === v ? T.pri : "white",
            color: val === v ? "white" : T.mut,
            cursor: "pointer",
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );

  const Row = ({ label, children }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: `1px solid ${T.brd}`,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>{label}</div>
      <div>{children}</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
          background: "white",
        }}
      >
        {[
          ["preview", "Preview"],
          ["nocode", "Visual"],
          ["css", "Custom CSS"],
        ].map(([k, l]) => (
          <div
            key={k}
            onClick={() => setSubTab(k)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              color: subTab === k ? T.pri : T.mut,
              borderBottom:
                subTab === k ? `2px solid ${T.pri}` : "2px solid transparent",
            }}
          >
            {l}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {subTab === "preview" && (
          <div
            style={{
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div style={{ fontSize: 12, color: T.mut }}>
              Live preview · type to simulate
            </div>
            <div
              style={{
                background: cfg.bgColor,
                borderRadius: r + 4,
                overflow: "hidden",
                width: "100%",
                maxWidth: 280,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  background: cfg.accentColor,
                  padding: "11px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "white",
                      fontSize: fs + 1,
                      fontWeight: 700,
                    }}
                  >
                    {cfg.headerText}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: fs - 1,
                    }}
                  >
                    {cfg.subText}
                  </div>
                </div>
                <div
                  onClick={() => setWOpen((w) => !w)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  {wOpen ? "−" : "+"}
                </div>
              </div>
              {wOpen && (
                <>
                  <div
                    ref={wRef}
                    style={{
                      padding: "10px",
                      minHeight: 150,
                      maxHeight: 190,
                      overflowY: "auto",
                    }}
                  >
                    {wMsgs.map((m, i) => {
                      if (m.r === "suc")
                        return (
                          <div key={i} style={{ marginBottom: 6 }}>
                            <div
                              style={{
                                background: "#14532d",
                                border: "1px solid rgba(16,185,129,0.3)",
                                borderRadius: `3px ${r}px ${r}px ${r}px`,
                                padding: "8px 10px",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: fs,
                                  color: "#4ade80",
                                  fontWeight: 700,
                                }}
                              >
                                Done
                              </div>
                              <div style={{ fontSize: fs, color: "#86efac" }}>
                                {m.t}
                              </div>
                            </div>
                          </div>
                        );
                      if (m.r === "u")
                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginBottom: 6,
                            }}
                          >
                            <div
                              style={{
                                background: cfg.accentColor,
                                borderRadius: `${r}px ${r}px 3px ${r}px`,
                                padding: "7px 10px",
                                fontSize: fs,
                                color: "white",
                                maxWidth: "80%",
                              }}
                            >
                              {m.t}
                            </div>
                          </div>
                        );
                      return (
                        <div key={i} style={{ marginBottom: 6 }}>
                          <div
                            style={{
                              background: "#334155",
                              borderRadius: `3px ${r}px ${r}px ${r}px`,
                              padding: "7px 10px",
                              fontSize: fs,
                              color: "#E2E8F0",
                            }}
                          >
                            {m.t}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      padding: "7px",
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      gap: 5,
                    }}
                  >
                    <input
                      value={wInput}
                      onChange={(e) => setWInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && wSend()}
                      disabled={wStep === "done"}
                      placeholder={
                        wStep === "name"
                          ? "Full name..."
                          : wStep === "email"
                          ? "Email..."
                          : "Try: invite a team member"
                      }
                      style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.08)",
                        border: "none",
                        borderRadius: r - 2,
                        padding: "5px 9px",
                        fontSize: fs,
                        color: "white",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={wSend}
                      disabled={wStep === "done"}
                      style={{
                        background: cfg.accentColor,
                        border: "none",
                        borderRadius: r - 2,
                        padding: "5px 9px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: fs,
                      }}
                    >
                      ↑
                    </button>
                  </div>
                  {cfg.showBranding && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "3px 0 5px",
                        fontSize: 9,
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      Powered by Userflow
                    </div>
                  )}
                </>
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: T.mut, marginBottom: 8 }}>
                Launcher
              </div>
              <div
                style={{
                  width:
                    cfg.launcherSize === "sm"
                      ? 42
                      : cfg.launcherSize === "md"
                      ? 52
                      : 62,
                  height:
                    cfg.launcherSize === "sm"
                      ? 42
                      : cfg.launcherSize === "md"
                      ? 52
                      : 62,
                  borderRadius: "50%",
                  background: cfg.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  margin: "0 auto",
                }}
              >
                <span
                  style={{
                    fontSize:
                      cfg.launcherSize === "sm"
                        ? 18
                        : cfg.launcherSize === "md"
                        ? 22
                        : 28,
                  }}
                >
                  {cfg.launcherIcon === "chat"
                    ? "💬"
                    : cfg.launcherIcon === "question"
                    ? "❓"
                    : "⭐"}
                </span>
              </div>
            </div>
          </div>
        )}
        {subTab === "nocode" && (
          <div style={{ padding: "14px 18px" }}>
            <Row label="Accent colour">
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {SWATCHES.map((s) => (
                  <div
                    key={s}
                    onClick={() => set("accentColor", s)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: s,
                      cursor: "pointer",
                      border:
                        cfg.accentColor === s
                          ? `2px solid ${T.txt}`
                          : "2px solid transparent",
                      boxSizing: "border-box",
                    }}
                  />
                ))}
                <input
                  type="color"
                  value={cfg.accentColor}
                  onChange={(e) => set("accentColor", e.target.value)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Row>
            <Row label="Background">
              <div style={{ display: "flex", gap: 5 }}>
                {["#0D1117", "#1E293B", "#1F2937", "#FFFFFF", "#F8FAFC"].map(
                  (s) => (
                    <div
                      key={s}
                      onClick={() => set("bgColor", s)}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: s,
                        cursor: "pointer",
                        border:
                          cfg.bgColor === s
                            ? `2px solid ${T.pri}`
                            : "2px solid rgba(0,0,0,0.1)",
                        boxSizing: "border-box",
                      }}
                    />
                  )
                )}
              </div>
            </Row>
            <Row label="Header title">
              <input
                value={cfg.headerText}
                onChange={(e) => set("headerText", e.target.value)}
                style={{
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 12,
                  outline: "none",
                  width: 130,
                  color: T.txt,
                }}
              />
            </Row>
            <Row label="Subtitle">
              <input
                value={cfg.subText}
                onChange={(e) => set("subText", e.target.value)}
                style={{
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 12,
                  outline: "none",
                  width: 130,
                  color: T.txt,
                }}
              />
            </Row>
            <Row label="Corner radius">
              <Seg
                options={[
                  ["sm", "S"],
                  ["md", "M"],
                  ["lg", "L"],
                ]}
                val={cfg.rounded}
                onChange={(v) => set("rounded", v)}
              />
            </Row>
            <Row label="Font size">
              <Seg
                options={[
                  ["sm", "S"],
                  ["md", "M"],
                  ["lg", "L"],
                ]}
                val={cfg.fontSize}
                onChange={(v) => set("fontSize", v)}
              />
            </Row>
            <Row label="Position">
              <Seg
                options={[
                  ["bottom-right", "Right"],
                  ["bottom-left", "Left"],
                ]}
                val={cfg.position}
                onChange={(v) => set("position", v)}
              />
            </Row>
            <Row label="Launcher icon">
              <Seg
                options={[
                  ["chat", "💬"],
                  ["question", "❓"],
                  ["star", "⭐"],
                ]}
                val={cfg.launcherIcon}
                onChange={(v) => set("launcherIcon", v)}
              />
            </Row>
            <Row label="Launcher size">
              <Seg
                options={[
                  ["sm", "S"],
                  ["md", "M"],
                  ["lg", "L"],
                ]}
                val={cfg.launcherSize}
                onChange={(v) => set("launcherSize", v)}
              />
            </Row>
            <Row label="Show branding">
              <div
                onClick={() => set("showBranding", !cfg.showBranding)}
                style={{
                  width: 34,
                  height: 20,
                  borderRadius: 10,
                  background: cfg.showBranding ? T.g : "#D1D5DB",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: cfg.showBranding ? 16 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "white",
                    transition: "left 0.15s",
                  }}
                />
              </div>
            </Row>
            <div style={{ marginTop: 14 }}>
              <Btn v="pri" sz="sm" onClick={() => setSubTab("preview")}>
                Preview changes →
              </Btn>
            </div>
          </div>
        )}
        {subTab === "css" && (
          <div
            style={{
              padding: "14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: T.txt }}>
              Custom CSS
            </div>
            <div style={{ fontSize: 11, color: T.mut, lineHeight: 1.6 }}>
              Write CSS targeting Userflow widget classes. Applied on top of
              visual settings.
            </div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              rows={14}
              spellCheck={false}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: `1px solid ${T.brd}`,
                borderRadius: 8,
                padding: "12px 13px",
                fontSize: 11,
                fontFamily: "monospace",
                lineHeight: 1.7,
                outline: "none",
                resize: "vertical",
                color: T.txt,
                background: "#F9FAFB",
              }}
            />
            <div
              style={{
                background: T.priL,
                border: `1px solid ${T.pri}30`,
                borderRadius: 8,
                padding: "10px 13px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.priT,
                  marginBottom: 6,
                }}
              >
                Available classes
              </div>
              {[
                ["uf-widget", "Outer container"],
                ["uf-widget-header", "Header bar"],
                ["uf-bubble-agent", "Agent bubble"],
                ["uf-bubble-user", "User bubble"],
                ["uf-input", "Text input"],
                ["uf-launcher", "Launcher button"],
              ].map(([cls, desc], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "2px 0",
                    fontSize: 11,
                  }}
                >
                  <code
                    style={{ color: T.pri, fontWeight: 700, minWidth: 130 }}
                  >
                    .{cls}
                  </code>
                  <span style={{ color: T.mut }}>{desc}</span>
                </div>
              ))}
            </div>
            <Btn v="pri" sz="sm" onClick={() => setSubTab("preview")}>
              Preview changes →
            </Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Agent settings ─────────────────────────────────────────────────
function AgentSettings({ agent, sources }) {
  const ATTRS = [
    "Current URL",
    "User role",
    "Plan type",
    "Days since signup",
    "Feature flag",
    "Company name",
    "User email",
  ];
  const OPS = {
    text: ["is", "is not", "contains", "starts with"],
    select: ["is", "is not"],
    number: ["equals", "greater than", "less than"],
  };
  const TYPE = {
    "Current URL": "text",
    "User role": "select",
    "Plan type": "select",
    "Days since signup": "number",
    "Feature flag": "select",
    "Company name": "text",
    "User email": "text",
  };
  const VALS = {
    "User role": ["admin", "member", "viewer"],
    "Plan type": ["free", "trial", "starter", "growth", "enterprise"],
    "Feature flag": ["enabled", "disabled"],
  };

  const [rules, setRules] = useState([
    { id: 1, attr: "Plan type", op: "is not", val: "free", enabled: true },
    {
      id: 2,
      attr: "Days since signup",
      op: "less than",
      val: "30",
      enabled: true,
    },
  ]);
  const [logic, setLogic] = useState("AND");
  const [adding, setAdding] = useState(false);
  const [newRule, setNewRule] = useState({
    attr: "Current URL",
    op: "contains",
    val: "",
  });
  const [handover, setHandover] = useState({
    enabled: true,
    trigger: "unanswered",
    destination: "livechat",
    attempts: "2",
    preMessage: "Let me connect you with a team member who can help.",
    email: "",
  });

  const typeOf = (a) => TYPE[a] || "text";
  const opsOf = (a) => OPS[typeOf(a)] || OPS.text;
  const setH = (k, v) => setHandover((h) => ({ ...h, [k]: v }));

  const addRule = () => {
    if (!newRule.val.trim()) return;
    setRules((r) => [...r, { ...newRule, id: Date.now(), enabled: true }]);
    setNewRule({ attr: "Current URL", op: "contains", val: "" });
    setAdding(false);
  };

  return (
    <div style={{ padding: "16px 18px" }}>
      {[
        ["Agent name", agent?.name || "Onboarding Agent"],
        ["Goal", agent?.goal || "Improve activation rate for new users"],
      ].map(([l, v], i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.mut,
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {l}
          </div>
          <div
            style={{
              fontSize: 13,
              color: T.txt,
              background: "#F9FAFB",
              borderRadius: 7,
              padding: "8px 11px",
              border: `1px solid ${T.brd}`,
            }}
          >
            {v}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <Btn v="out" sz="sm">
          Edit goal
        </Btn>
        <Btn v="ghost" sz="sm">
          Pause agent
        </Btn>
      </div>

      <div style={{ borderTop: `1px solid ${T.brd}`, marginBottom: 18 }} />

      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt }}>
              Sources
            </div>
            <div style={{ fontSize: 11, color: T.mut, marginTop: 2 }}>
              The agent draws context from these sources.
            </div>
          </div>
          <Btn v="soft" sz="sm">
            + Add
          </Btn>
        </div>
        {sources.map((src) => (
          <div
            key={src.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              border: `1px solid ${T.brd}`,
              borderRadius: 8,
              marginBottom: 7,
              background: "white",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: src.colorL,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {src.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.txt,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {src.name}
              </div>
              <div style={{ fontSize: 10, color: T.mut }}>{src.detail}</div>
            </div>
            <Tag c="green">{src.status}</Tag>
            <button
              style={{
                background: "none",
                border: "none",
                color: T.mut,
                cursor: "pointer",
                fontSize: 14,
                padding: "0 2px",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${T.brd}`, marginBottom: 18 }} />

      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.txt,
            marginBottom: 2,
          }}
        >
          Display conditions
        </div>
        <div style={{ fontSize: 11, color: T.mut, marginBottom: 12 }}>
          Widget only shows when all conditions are met. Leave empty to show for
          everyone.
        </div>
        {rules.map((r, i) => (
          <div key={r.id}>
            {i > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "5px 0",
                }}
              >
                <div style={{ flex: 1, height: 1, background: T.brd }} />
                <div
                  onClick={() => setLogic((l) => (l === "AND" ? "OR" : "AND"))}
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: T.pri,
                    background: T.priL,
                    borderRadius: 20,
                    padding: "2px 8px",
                    cursor: "pointer",
                  }}
                >
                  {logic}
                </div>
                <div style={{ flex: 1, height: 1, background: T.brd }} />
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: r.enabled ? "white" : "#F9FAFB",
                border: `1px solid ${T.brd}`,
                borderRadius: 8,
                padding: "8px 10px",
                marginBottom: 4,
                opacity: r.enabled ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: r.enabled ? T.g : "#D1D5DB",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: T.txt,
                  flexShrink: 0,
                }}
              >
                {r.attr}
              </span>
              <span style={{ fontSize: 11, color: T.mut, flexShrink: 0 }}>
                {r.op}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: T.pri,
                  fontWeight: 600,
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                "{r.val}"
              </span>
              <button
                onClick={() =>
                  setRules((rs) =>
                    rs.map((x) =>
                      x.id === r.id ? { ...x, enabled: !x.enabled } : x
                    )
                  )
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 11,
                  color: T.mut,
                  padding: "2px 3px",
                }}
              >
                {r.enabled ? "⏸" : "▶"}
              </button>
              <button
                onClick={() =>
                  setRules((rs) => rs.filter((x) => x.id !== r.id))
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: T.r,
                  padding: "2px 3px",
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
        {adding && (
          <div
            style={{
              background: T.priL,
              border: `1px solid ${T.pri}40`,
              borderRadius: 9,
              padding: "12px",
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", gap: 7, marginBottom: 8 }}>
              <select
                value={newRule.attr}
                onChange={(e) =>
                  setNewRule((r) => ({
                    ...r,
                    attr: e.target.value,
                    op: opsOf(e.target.value)[0],
                    val: "",
                  }))
                }
                style={{
                  flex: 1,
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "6px 8px",
                  fontSize: 12,
                  outline: "none",
                  background: "white",
                }}
              >
                {ATTRS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <select
                value={newRule.op}
                onChange={(e) =>
                  setNewRule((r) => ({ ...r, op: e.target.value }))
                }
                style={{
                  flex: 1,
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "6px 8px",
                  fontSize: 12,
                  outline: "none",
                  background: "white",
                }}
              >
                {opsOf(newRule.attr).map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            {VALS[newRule.attr] ? (
              <select
                value={newRule.val}
                onChange={(e) =>
                  setNewRule((r) => ({ ...r, val: e.target.value }))
                }
                style={{
                  width: "100%",
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "6px 8px",
                  fontSize: 12,
                  outline: "none",
                  background: "white",
                  marginBottom: 8,
                }}
              >
                <option value="">Select...</option>
                {VALS[newRule.attr].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            ) : (
              <input
                value={newRule.val}
                onChange={(e) =>
                  setNewRule((r) => ({ ...r, val: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && addRule()}
                placeholder="Enter value..."
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: `1px solid ${T.brd}`,
                  borderRadius: 6,
                  padding: "7px 10px",
                  fontSize: 12,
                  outline: "none",
                  marginBottom: 8,
                }}
              />
            )}
            <div style={{ display: "flex", gap: 7 }}>
              <Btn v="pri" sz="sm" onClick={addRule} disabled={!newRule.val}>
                Add condition
              </Btn>
              <Btn v="ghost" sz="sm" onClick={() => setAdding(false)}>
                Cancel
              </Btn>
            </div>
          </div>
        )}
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: `1px dashed ${T.brd}`,
              borderRadius: 8,
              padding: "8px 12px",
              cursor: "pointer",
              color: T.mut,
              fontSize: 12,
              width: "100%",
              marginTop: 6,
            }}
          >
            <span style={{ color: T.pri, fontSize: 14 }}>+</span> Add condition
          </button>
        )}
        {rules.filter((r) => r.enabled).length > 0 && (
          <div
            style={{
              marginTop: 10,
              background: "#F9FAFB",
              borderRadius: 7,
              padding: "9px 12px",
              fontSize: 11,
              color: T.mut,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: T.txt }}>Preview: </strong>
            {rules
              .filter((r) => r.enabled)
              .map((r, i) => (
                <span key={r.id}>
                  {i > 0 && <strong style={{ color: T.pri }}> {logic} </strong>}
                  <em>{r.attr}</em> {r.op}{" "}
                  <strong style={{ color: T.priT }}>"{r.val}"</strong>
                </span>
              ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${T.brd}`, marginBottom: 18 }} />

      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.txt }}>
              Agent handover
            </div>
            <div style={{ fontSize: 11, color: T.mut, marginTop: 2 }}>
              What happens when the agent can't resolve a question.
            </div>
          </div>
          <div
            onClick={() => setH("enabled", !handover.enabled)}
            style={{
              width: 34,
              height: 20,
              borderRadius: 10,
              background: handover.enabled ? T.g : "#D1D5DB",
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 2,
                left: handover.enabled ? 16 : 2,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "white",
                transition: "left 0.15s",
              }}
            />
          </div>
        </div>
        {handover.enabled && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.mut,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 7,
                }}
              >
                When to hand over
              </div>
              {[
                ["unanswered", "Agent can't answer after retries"],
                ["requested", "User explicitly asks for a human"],
                ["always", "Always offer handover option"],
              ].map(([k, l]) => (
                <div
                  key={k}
                  onClick={() => setH("trigger", k)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: `1.5px solid ${
                      handover.trigger === k ? T.pri : T.brd
                    }`,
                    background: handover.trigger === k ? T.priL : "white",
                    cursor: "pointer",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: `2px solid ${
                        handover.trigger === k ? T.pri : T.brd
                      }`,
                      background: handover.trigger === k ? T.pri : "white",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {handover.trigger === k && (
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "white",
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: handover.trigger === k ? T.priT : T.txt,
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
              {handover.trigger === "unanswered" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    background: "#F9FAFB",
                    borderRadius: 7,
                    border: `1px solid ${T.brd}`,
                  }}
                >
                  <span style={{ fontSize: 12, color: T.txt }}>
                    Hand over after
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={handover.attempts}
                    onChange={(e) => setH("attempts", e.target.value)}
                    style={{
                      width: 44,
                      border: `1px solid ${T.brd}`,
                      borderRadius: 6,
                      padding: "4px 8px",
                      fontSize: 12,
                      outline: "none",
                      textAlign: "center",
                    }}
                  />
                  <span style={{ fontSize: 12, color: T.txt }}>
                    failed attempt{handover.attempts !== "1" ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.mut,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 7,
                }}
              >
                Destination
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  ["livechat", "💬 Live chat"],
                  ["ticket", "🎫 Ticket"],
                  ["email", "✉ Email"],
                ].map(([k, l]) => (
                  <div
                    key={k}
                    onClick={() => setH("destination", k)}
                    style={{
                      flex: 1,
                      textAlign: "center",
                      padding: "8px 4px",
                      borderRadius: 7,
                      border: `1.5px solid ${
                        handover.destination === k ? T.pri : T.brd
                      }`,
                      background: handover.destination === k ? T.priL : "white",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      color: handover.destination === k ? T.priT : T.txt,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              {handover.destination === "email" && (
                <input
                  value={handover.email}
                  onChange={(e) => setH("email", e.target.value)}
                  placeholder="support@yourcompany.com"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop: 8,
                    border: `1px solid ${T.brd}`,
                    borderRadius: 7,
                    padding: "8px 11px",
                    fontSize: 12,
                    outline: "none",
                  }}
                />
              )}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.mut,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 5,
                }}
              >
                Message before handover
              </div>
              <textarea
                value={handover.preMessage}
                onChange={(e) => setH("preMessage", e.target.value)}
                rows={2}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  border: `1px solid ${T.brd}`,
                  borderRadius: 7,
                  padding: "8px 11px",
                  fontSize: 12,
                  outline: "none",
                  resize: "none",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                }}
              />
              <div style={{ fontSize: 10, color: T.mut, marginTop: 3 }}>
                Shown to the user just before they're transferred.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Agent panel ─────────────────────────────────────────────────────
// Now accepts a dynamic `agent` prop so any agent from the list can be opened
function AgentPanel({ onClose, agent, sources }) {
  const [tab, setTab] = useState("actions");
  const [toggles, setToggles] = useState({
    0: true,
    1: false,
    2: true,
    3: false,
    4: false,
    5: true,
    6: true,
  });

  const ACTIONS_LIST = [
    { id: 0, name: "Invite team member", section: "Settings / Team" },
    { id: 1, name: "Remove team member", section: "Settings / Team" },
    { id: 2, name: "Connect Slack", section: "Integrations" },
    { id: 3, name: "Generate API key", section: "Integrations" },
    { id: 4, name: "Archive project", section: "Projects" },
    { id: 5, name: "Export report as CSV", section: "Reports" },
    { id: 6, name: "Create project", section: "Projects" },
  ];

  const statusColor = agent?.status === "live" ? "green" : "gray";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "14px 18px",
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: T.priL,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ◎
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.txt }}>
              {agent?.name || "Agent"}
            </div>
            <div style={{ fontSize: 11, color: T.mut }}>
              {agent?.goal || ""}
            </div>
          </div>
          <Tag c={statusColor}>{agent?.status || "live"}</Tag>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {sources.slice(0, 2).map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: s.colorL,
                borderRadius: 6,
                padding: "3px 9px",
                fontSize: 11,
                fontWeight: 600,
                color: T.txt,
              }}
            >
              <span>{s.icon}</span>
              {s.name.split(" ")[0]}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        {[
          ["actions", "Actions"],
          ["widget", "Widget"],
          ["settings", "Settings"],
        ].map(([k, l]) => (
          <div
            key={k}
            onClick={() => setTab(k)}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "9px 0",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              color: tab === k ? T.pri : T.mut,
              borderBottom:
                tab === k ? `2px solid ${T.pri}` : "2px solid transparent",
            }}
          >
            {l}
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tab === "actions" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div
              style={{
                padding: "12px 18px 6px",
                fontSize: 12,
                color: T.mut,
                lineHeight: 1.5,
              }}
            >
              Enable actions the agent can perform on behalf of users. Toggle
              off to guide instead.
            </div>
            {ACTIONS_LIST.map((a) => {
              const on = toggles[a.id];
              return (
                <div
                  key={a.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 18px",
                    borderBottom: `1px solid ${T.brd}`,
                    background: on ? "#FAFFFD" : "white",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 13, fontWeight: 500, color: T.txt }}
                    >
                      {a.name}
                    </div>
                    <div style={{ fontSize: 11, color: T.mut }}>
                      {a.section}
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setToggles((t) => ({ ...t, [a.id]: !t[a.id] }))
                    }
                    style={{
                      width: 36,
                      height: 20,
                      borderRadius: 10,
                      background: on ? T.g : "#D1D5DB",
                      cursor: "pointer",
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 2,
                        left: on ? 18 : 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "white",
                        transition: "left 0.15s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: on ? T.gT : T.mut,
                      width: 24,
                      fontWeight: 600,
                    }}
                  >
                    {on ? "ON" : "OFF"}
                  </span>
                </div>
              );
            })}
            <div style={{ padding: "12px 18px" }}>
              <div
                style={{
                  fontSize: 12,
                  color: T.mut,
                  background: T.brd + "40",
                  borderRadius: 8,
                  padding: "10px 12px",
                  lineHeight: 1.6,
                }}
              >
                <strong>Resolution order:</strong> Direct action → Guided flow →
                KB answer → Handover
              </div>
            </div>
          </div>
        )}
        {tab === "widget" && <WidgetPreview />}
        {tab === "settings" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <AgentSettings agent={agent} sources={sources} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Chat view ──────────────────────────────────────────────────────
function ChatView({ panel, setPanel, addSource, addAgent, sources }) {
  const [phase, setPhase] = useState("home");
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [ctx, setCtx] = useState({});
  const [bpProg, setBpProg] = useState(0);
  const [bpDone, setBpDone] = useState(false);
  const [bpStarted, setBpStarted] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);
  const bottomRef = useRef();
  const crawlRef = useRef(null);
  const addSourceRef = useRef(addSource);
  const addAgentRef = useRef(addAgent);
  addSourceRef.current = addSource;
  addAgentRef.current = addAgent;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const addMsgRef = useRef(null);

  const STEPS = {
    goal_ack: (c) => ({
      text: `Got it — ${c.goal}.\n\nTo build your adoption agent properly, I'll need to navigate through your app and map every path a user can take.\n\nWhat's your app URL?`,
      input: "url",
    }),
    url_ack: (c) => ({
      text: `I'll start crawling ${c.url}.\n\nTo navigate it, I need login credentials. These are only used during the crawl session — never stored.\n\nWhat auth method does your app use?`,
      input: "auth",
    }),
    creds_ack: () => ({
      text: `While the blueprint is building, do you want to connect any additional context sources? This helps the agent answer questions it can't act on directly.`,
      input: "sources",
    }),
    sources_ack: () => ({
      text: `Blueprint is ready — 18 actions mapped across your product. I've saved it to your Sources.\n\nWhat would you like to do next?`,
      input: "artifact",
    }),
  };

  const addMsg = (key) => {
    const cfg = STEPS[key](ctx);
    setMessages((p) => [
      ...p,
      { id: Date.now(), role: "agent", ...cfg, submitted: false },
    ]);
    setThinking(false);
  };
  addMsgRef.current = addMsg;

  useEffect(() => {
    if (!bpStarted) return;
    crawlRef.current = setInterval(() => {
      setBpProg((p) => Math.min(p + 2, 100));
    }, 200);
    return () => {
      if (crawlRef.current) clearInterval(crawlRef.current);
    };
  }, [bpStarted]);

  useEffect(() => {
    if (bpProg < 100 || !bpStarted || bpDone) return;
    if (crawlRef.current) clearInterval(crawlRef.current);
    setTimeout(() => {
      setBpDone(true);
      addSourceRef.current();
      setThinking(true);
      setTimeout(() => addMsgRef.current("sources_ack"), 500);
    }, 200);
  }, [bpProg]);

  const markDone = (id, label) =>
    setMessages((p) =>
      p.map((m) =>
        m.id === id ? { ...m, submitted: true, doneLabel: label } : m
      )
    );

  const handleAction = (type, val, msgId) => {
    if (type === "url") {
      setCtx((c) => ({ ...c, url: val }));
      markDone(msgId, val);
      setMessages((p) => [...p, { id: Date.now(), role: "user", text: val }]);
      setThinking(true);
      setTimeout(() => addMsgRef.current("url_ack"), 800);
    }
    if (type === "auth") {
      markDone(msgId, `${val} selected`);
      setMessages((p) => [...p, { id: Date.now(), role: "user", text: val }]);
      setBpStarted(true);
      setBpProg(1);
      setThinking(true);
      setTimeout(() => addMsgRef.current("creds_ack"), 800);
    }
    if (type === "sources") {
      markDone(msgId, "sources saved");
    }
  };

  const startChat = (goal) => {
    setCtx({ goal });
    setPhase("chat");
    setMessages([{ id: 1, role: "user", text: goal }]);
    setThinking(true);
    setTimeout(() => addMsgRef.current("goal_ack"), 900);
  };

  // The new agent object for the chat flow
  const newAgentObj = {
    id: "ag_new",
    name: "Onboarding Agent",
    goal: "Improve activation rate for new users",
    status: "live",
    convs: 0,
    actions: 7,
    sources: ["bp_new", "kb1"],
  };

  if (phase === "home")
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          background: T.bg,
        }}
      >
        <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 10,
              lineHeight: 1.3,
            }}
          >
            What outcome do you want
            <br />
            your adoption agent to drive?
          </div>
          <div
            style={{
              fontSize: 14,
              color: T.mut,
              marginBottom: 26,
              lineHeight: 1.6,
            }}
          >
            Describe your goal — I'll map your product, configure the agent, and
            get everything ready.
          </div>
          <div
            style={{
              background: T.card,
              border: `1.5px solid ${T.brd}`,
              borderRadius: 13,
              padding: "14px 16px 12px",
              marginBottom: 14,
              boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
            }}
          >
            <textarea
              id="goalInput"
              placeholder="e.g. I want to increase activation rate for new users..."
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const v = document.getElementById("goalInput")?.value;
                  if (v?.trim()) startChat(v);
                }
              }}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                fontSize: 14,
                color: T.txt,
                background: "transparent",
                lineHeight: 1.6,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 4,
              }}
            >
              <button
                style={{
                  background: T.pri,
                  border: "none",
                  borderRadius: 8,
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const v = document.getElementById("goalInput")?.value;
                  if (v?.trim()) startChat(v);
                }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 13V3M3 8l5-5 5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {NUDGES.map((n, i) => (
              <div
                key={i}
                onClick={() => startChat(n.label)}
                style={{
                  background: T.card,
                  border: `1px solid ${T.brd}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontSize: 13,
                  color: T.mut,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: T.pri }}>{n.icon}</span>
                {n.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: T.bg,
      }}
    >
      {bpStarted && !bpDone && (
        <div
          style={{
            padding: "8px 20px",
            background: T.priL,
            borderBottom: `1px solid ${T.pri}30`,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.priT,
              flexShrink: 0,
            }}
          >
            Building blueprint...
          </span>
          <div
            style={{
              flex: 1,
              background: T.pri + "20",
              borderRadius: 4,
              height: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: T.pri,
                height: "100%",
                borderRadius: 4,
                width: `${bpProg}%`,
                transition: "width 0.18s linear",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.priT,
              flexShrink: 0,
            }}
          >
            {bpProg}%
          </span>
        </div>
      )}
      {bpDone && (
        <div
          style={{
            padding: "8px 20px",
            background: T.gL,
            borderBottom: `1px solid ${T.g}30`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: T.gT }}>
            ◈ Blueprint ready — 18 actions mapped
          </span>
          <span style={{ fontSize: 11, color: T.gT, marginLeft: "auto" }}>
            ✓ Saved to Sources
          </span>
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 0" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 22px" }}>
          {messages.map((m, i) => {
            if (m.role === "user")
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      background: T.pri,
                      color: "white",
                      borderRadius: "16px 16px 4px 16px",
                      padding: "10px 15px",
                      fontSize: 14,
                      maxWidth: "72%",
                      lineHeight: 1.6,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            return (
              <div key={i} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 7,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: T.pri,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    U
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.mut }}>
                    Userflow
                  </span>
                </div>
                <div style={{ paddingLeft: 30 }}>
                  <div
                    style={{
                      fontSize: 14,
                      color: T.txt,
                      lineHeight: 1.7,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.text}
                  </div>

                  {m.input === "url" && !m.submitted && (
                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <input
                        id={`url_${m.id}`}
                        defaultValue="https://app.acme.com"
                        style={{
                          flex: 1,
                          border: `1px solid ${T.brd}`,
                          borderRadius: 7,
                          padding: "8px 11px",
                          fontSize: 13,
                          outline: "none",
                        }}
                      />
                      <Btn
                        v="pri"
                        sz="sm"
                        onClick={() => {
                          const v =
                            document.getElementById(`url_${m.id}`)?.value ||
                            "https://app.acme.com";
                          handleAction("url", v, m.id);
                        }}
                      >
                        Continue
                      </Btn>
                    </div>
                  )}

                  {m.input === "auth" && !m.submitted && (
                    <div style={{ marginTop: 10 }}>
                      {[
                        ["password", "Username & password"],
                        ["oauth", "OAuth / SSO"],
                        ["token", "API token"],
                      ].map(([k, l]) => (
                        <div
                          key={k}
                          onClick={() => handleAction("auth", k, m.id)}
                          style={{
                            padding: "9px 13px",
                            borderRadius: 8,
                            border: `1px solid ${T.brd}`,
                            background: "white",
                            cursor: "pointer",
                            fontSize: 13,
                            color: T.txt,
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          {l}
                          <span style={{ color: T.mut }}>›</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {m.input === "sources" && (
                    <div style={{ marginTop: 10 }}>
                      {!bpDone ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: T.priL,
                            border: `1px solid ${T.pri}40`,
                            borderRadius: 8,
                            padding: "9px 13px",
                            marginBottom: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: T.pri,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: T.priT,
                              flexShrink: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Building blueprint...
                          </span>
                          <div
                            style={{
                              flex: 1,
                              background: T.pri + "20",
                              borderRadius: 3,
                              height: 4,
                              overflow: "hidden",
                              minWidth: 60,
                            }}
                          >
                            <div
                              style={{
                                background: T.pri,
                                height: "100%",
                                borderRadius: 3,
                                width: `${bpProg}%`,
                                transition: "width 0.18s linear",
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: T.priT,
                              flexShrink: 0,
                            }}
                          >
                            {bpProg}%
                          </span>
                        </div>
                      ) : (
                        <div
                          onClick={() => setPanel("blueprint")}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: T.gL,
                            border: `1px solid ${T.g}60`,
                            borderRadius: 9,
                            padding: "10px 14px",
                            cursor: "pointer",
                            marginBottom: 12,
                            maxWidth: 340,
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              background: T.g + "30",
                              borderRadius: 7,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 14,
                            }}
                          >
                            ◈
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: T.gT,
                              }}
                            >
                              Blueprint ready
                            </div>
                            <div style={{ fontSize: 11, color: T.gT }}>
                              18 actions · 7 sections · Saved
                            </div>
                          </div>
                          <span style={{ color: T.g }}>→</span>
                        </div>
                      )}
                      <SourcePicker />
                    </div>
                  )}

                  {m.input === "artifact" && (
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <div
                        onClick={() =>
                          setPanel(panel === "blueprint" ? null : "blueprint")
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          background: T.card,
                          border: `1.5px solid ${
                            panel === "blueprint" ? T.pri : T.brd
                          }`,
                          borderRadius: 10,
                          padding: "11px 14px",
                          cursor: "pointer",
                          maxWidth: 340,
                          boxSizing: "border-box",
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            background: T.priL,
                            borderRadius: 7,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 15,
                          }}
                        >
                          ◈
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: T.txt,
                            }}
                          >
                            View Blueprint
                          </div>
                          <div style={{ fontSize: 11, color: T.mut }}>
                            18 actions · 7 sections
                          </div>
                        </div>
                        <Tag c="green">Ready</Tag>
                      </div>
                      {!agentCreated ? (
                        <div
                          onClick={() => {
                            setAgentCreated(true);
                            addAgentRef.current();
                            setPanel({ type: "agent", agent: newAgentObj });
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: T.priL,
                            border: `1.5px solid ${T.pri}`,
                            borderRadius: 10,
                            padding: "11px 14px",
                            cursor: "pointer",
                            maxWidth: 340,
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              background: T.pri,
                              borderRadius: 7,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 15,
                            }}
                          >
                            ◎
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: T.priT,
                              }}
                            >
                              Create Adoption Agent
                            </div>
                            <div style={{ fontSize: 11, color: T.priT }}>
                              Configure actions, widget and deployment
                            </div>
                          </div>
                          <span style={{ color: T.pri }}>→</span>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            setPanel(
                              panel?.type === "agent"
                                ? null
                                : { type: "agent", agent: newAgentObj }
                            )
                          }
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            background: T.card,
                            border: `1.5px solid ${
                              panel?.type === "agent" ? T.pri : T.brd
                            }`,
                            borderRadius: 10,
                            padding: "11px 14px",
                            cursor: "pointer",
                            maxWidth: 340,
                            boxSizing: "border-box",
                          }}
                        >
                          <div
                            style={{
                              width: 30,
                              height: 30,
                              background: T.priL,
                              borderRadius: 7,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 15,
                            }}
                          >
                            ◎
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: T.txt,
                              }}
                            >
                              Onboarding Agent
                            </div>
                            <div style={{ fontSize: 11, color: T.mut }}>
                              Live · 7 actions enabled
                            </div>
                          </div>
                          <Tag c="green">Live</Tag>
                        </div>
                      )}
                    </div>
                  )}

                  {m.submitted &&
                    m.input &&
                    !["sources", "artifact", "url", "auth"].includes(
                      m.input
                    ) && (
                      <div style={{ marginTop: 6, fontSize: 12, color: T.g }}>
                        ✓ {m.doneLabel}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
          {thinking && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 7,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: T.pri,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  U
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.mut }}>
                  Userflow
                </span>
              </div>
              <div style={{ paddingLeft: 30, display: "flex", gap: 5 }}>
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: T.pri,
                      opacity: 0.25 + j * 0.25,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <div
        style={{
          padding: "12px 22px 16px",
          borderTop: `1px solid ${T.brd}`,
          background: T.card,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
          }}
        >
          <textarea
            placeholder="Reply..."
            rows={1}
            style={{
              flex: 1,
              border: `1px solid ${T.brd}`,
              borderRadius: 9,
              padding: "9px 13px",
              fontSize: 14,
              color: T.txt,
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
              fontFamily: "inherit",
              background: "white",
            }}
          />
          <button
            style={{
              background: T.pri,
              border: "none",
              borderRadius: 8,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 13V3M3 8l5-5 5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sources page ─────────────────────────────────────────────────────
// FIX: + Add source now opens the AddSourceModal with full multi-step flow
function SourcesView({ sources, setSources }) {
  const [sel, setSel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const typeLabel = {
    blueprint: "Blueprint",
    knowledge_base: "Knowledge Base",
    crm: "CRM",
    analytics: "Analytics",
  };
  const typeColor = {
    blueprint: "indigo",
    knowledge_base: "amber",
    crm: "green",
    analytics: "purple",
  };

  const handleAdd = (newSrc) => {
    setSources((s) => [newSrc, ...s]);
  };

  return (
    <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
      {showModal && (
        <AddSourceModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: T.txt,
                margin: "0 0 4px",
              }}
            >
              Sources
            </h1>
            <p style={{ fontSize: 13, color: T.mut, margin: 0 }}>
              Every context source in your workspace. Attach any source to one
              or more adoption agents.
            </p>
          </div>
          <Btn v="pri" onClick={() => setShowModal(true)}>
            + Add source
          </Btn>
        </div>
        {sources.map((src) => (
          <Card
            key={src.id}
            style={{
              marginBottom: 10,
              overflow: "hidden",
              cursor: "pointer",
              borderWidth: sel === src.id ? 1.5 : 1,
              borderColor: sel === src.id ? T.pri : T.brd,
            }}
            onClick={() => setSel(sel === src.id ? null : src.id)}
          >
            <div style={{ display: "flex" }}>
              <div style={{ width: 4, background: src.color, flexShrink: 0 }} />
              <div
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    background: src.colorL,
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 17,
                    flexShrink: 0,
                  }}
                >
                  {src.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{ fontSize: 14, fontWeight: 700, color: T.txt }}
                    >
                      {src.name}
                    </span>
                    <Tag c={typeColor[src.type] || "gray"}>
                      {typeLabel[src.type] || src.type}
                    </Tag>
                    <Tag c="green">{src.status}</Tag>
                  </div>
                  <div style={{ fontSize: 12, color: T.mut }}>{src.detail}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: T.mut, marginBottom: 4 }}>
                    Used by
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      justifyContent: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    {(src.usedBy || []).length === 0 ? (
                      <span style={{ fontSize: 11, color: T.mut }}>
                        Not attached
                      </span>
                    ) : (
                      (src.usedBy || []).map((a, i) => (
                        <Tag key={i} c="indigo">
                          {a}
                        </Tag>
                      ))
                    )}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: T.mut,
                    marginLeft: 12,
                    flexShrink: 0,
                  }}
                >
                  {src.created}
                </div>
              </div>
            </div>
            {sel === src.id && (
              <div
                style={{
                  padding: "10px 22px 12px",
                  borderTop: `1px solid ${T.brd}`,
                  background: "#FAFBFF",
                  display: "flex",
                  gap: 8,
                }}
              >
                <Btn v="out" sz="sm">
                  Re-sync
                </Btn>
                <Btn v="out" sz="sm">
                  Attach to agent
                </Btn>
                <Btn v="ghost" sz="sm">
                  Remove
                </Btn>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── Mini sparkline SVG ─────────────────────────────────────────────
function Sparkline({ data, color, height = 40, width = 120 }) {
  const max = Math.max(...data),
    min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");
  const areapts = `0,${height} ` + pts + ` ${width},${height}`;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <defs>
        <linearGradient
          id={`sg_${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areapts} fill={`url(#sg_${color.replace("#", "")})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Bar chart ──────────────────────────────────────────────────────
function BarChart({ data, color, height = 80 }) {
  const max = Math.max(...data.map((d) => d.v)) || 1;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height }}>
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              background: color,
              borderRadius: "3px 3px 0 0",
              height: Math.max(4, (d.v / max) * (height - 18)),
              opacity: 0.85,
            }}
          />
          <div style={{ fontSize: 9, color: T.mut, whiteSpace: "nowrap" }}>
            {d.l}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Agent analytics tab ────────────────────────────────────────────
function AgentAnalytics({ agent }) {
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const convData = [12, 28, 34, 41, 38, 55, 62, 71];
  const resolData = [8, 20, 27, 36, 30, 47, 55, 64];
  const deflData = [4, 10, 14, 18, 16, 24, 28, 34];

  const topActions = [
    { name: "Invite team member", count: 142, pct: 38 },
    { name: "Connect Slack", count: 98, pct: 26 },
    { name: "Create project", count: 74, pct: 20 },
    { name: "Export report CSV", count: 42, pct: 11 },
    { name: "Generate API key", count: 19, pct: 5 },
  ];

  const handoverReasons = [
    { l: "Mon", v: 3 },
    { l: "Tue", v: 7 },
    { l: "Wed", v: 5 },
    { l: "Thu", v: 2 },
    { l: "Fri", v: 8 },
    { l: "Sat", v: 1 },
    { l: "Sun", v: 0 },
  ];

  const statCards = [
    {
      label: "Conversations",
      value: (agent?.convs || 71).toLocaleString(),
      delta: "+14%",
      up: true,
      data: convData,
      color: T.pri,
    },
    {
      label: "Resolved by agent",
      value: "90%",
      delta: "+3pp",
      up: true,
      data: resolData,
      color: T.g,
    },
    {
      label: "Tickets deflected",
      value: "34",
      delta: "+8",
      up: true,
      data: deflData,
      color: "#8B5CF6",
    },
    {
      label: "Avg handle time",
      value: "48s",
      delta: "−12s",
      up: true,
      data: [60, 58, 55, 52, 50, 49, 48, 48],
      color: T.a,
    },
  ];

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", flex: 1 }}>
      {/* KPI row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        {statCards.map((s, i) => (
          <div
            key={i}
            style={{
              background: T.card,
              border: `1px solid ${T.brd}`,
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: T.mut,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 8,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: T.txt,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: s.up ? T.gT : T.rT,
                  background: s.up ? T.gL : T.rL,
                  padding: "2px 7px",
                  borderRadius: 20,
                }}
              >
                {s.delta} vs last period
              </span>
              <Sparkline data={s.data} color={s.color} height={36} width={80} />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        {/* Conversations over time */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.brd}`,
            borderRadius: 12,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.txt }}>
                Conversations over time
              </div>
              <div style={{ fontSize: 11, color: T.mut, marginTop: 2 }}>
                Last 8 weeks
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 11 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: T.pri,
                    display: "inline-block",
                  }}
                />
                Total
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: T.g,
                    display: "inline-block",
                  }}
                />
                Resolved
              </span>
            </div>
          </div>
          {/* stacked line chart */}
          <div style={{ position: "relative", height: 100 }}>
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${weeks.length * 60} 100`}
              preserveAspectRatio="none"
            >
              {[convData, resolData].map((arr, si) => {
                const color = [T.pri, T.g][si];
                const max2 = Math.max(...convData);
                const pts = arr
                  .map(
                    (v, i) =>
                      `${i * (1 / (weeks.length - 1)) * 100}%,${
                        100 - ((v / max2) * 88 + 4)
                      }`
                  )
                  .join(" ");
                // fallback absolute approach
                const W = weeks.length;
                const H = 100;
                const polyPts = arr
                  .map(
                    (v, i) =>
                      `${(i / (W - 1)) * 520},${H - ((v / max2) * 84 + 4)}`
                  )
                  .join(" ");
                const areaPts = `0,${H} ` + polyPts + ` 520,${H}`;
                return (
                  <g key={si}>
                    <polygon points={areaPts} fill={color} fillOpacity={0.07} />
                    <polyline
                      points={polyPts}
                      fill="none"
                      stroke={color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {arr.map((v, i) => (
                      <circle
                        key={i}
                        cx={(i / (W - 1)) * 520}
                        cy={H - ((v / max2) * 84 + 4)}
                        r="3"
                        fill={color}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 4,
              }}
            >
              {weeks.map((w) => (
                <div
                  key={w}
                  style={{
                    fontSize: 9,
                    color: T.mut,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resolution breakdown donut */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.brd}`,
            borderRadius: 12,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 4,
            }}
          >
            Resolution breakdown
          </div>
          <div style={{ fontSize: 11, color: T.mut, marginBottom: 16 }}>
            How conversations ended
          </div>
          <svg
            width="100%"
            viewBox="0 0 100 100"
            style={{ display: "block", maxWidth: 120, margin: "0 auto 16px" }}
          >
            {[
              { pct: 64, color: T.g, offset: 0 },
              { pct: 22, color: T.pri, offset: 64 },
              { pct: 9, color: T.a, offset: 86 },
              { pct: 5, color: "#D1D5DB", offset: 95 },
            ].map((s, i) => {
              const r = 36,
                circ = 2 * Math.PI * r;
              const dash = circ * (s.pct / 100),
                gap = circ - dash;
              const rot = (s.offset / 100) * 360 - 90;
              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="14"
                  strokeDasharray={`${dash} ${gap}`}
                  strokeDashoffset="0"
                  transform={`rotate(${rot} 50 50)`}
                />
              );
            })}
            <text
              x="50"
              y="46"
              textAnchor="middle"
              style={{ fontSize: 13, fontWeight: 700, fill: T.txt }}
            >
              90%
            </text>
            <text
              x="50"
              y="58"
              textAnchor="middle"
              style={{ fontSize: 7, fill: T.mut }}
            >
              resolved
            </text>
          </svg>
          {[
            ["Resolved by agent", "64%", T.g],
            ["Guided to answer", "22%", T.pri],
            ["Handed over", "9%", T.a],
            ["Abandoned", "5%", "#D1D5DB"],
          ].map(([l, v, c], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: c,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 11, color: T.txt }}>{l}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.txt }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* Top actions */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.brd}`,
            borderRadius: 12,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 4,
            }}
          >
            Top actions performed
          </div>
          <div style={{ fontSize: 11, color: T.mut, marginBottom: 14 }}>
            By conversation count
          </div>
          {topActions.map((a, i) => (
            <div key={i} style={{ marginBottom: 11 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 12, color: T.txt, fontWeight: 500 }}>
                  {a.name}
                </span>
                <span style={{ fontSize: 11, color: T.mut, fontWeight: 600 }}>
                  {a.count}
                </span>
              </div>
              <div
                style={{
                  background: "#F3F4F6",
                  borderRadius: 4,
                  height: 5,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: T.pri,
                    height: "100%",
                    borderRadius: 4,
                    width: `${a.pct}%`,
                    transition: "width 0.4s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Handover heatmap */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.brd}`,
            borderRadius: 12,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: T.txt,
              marginBottom: 4,
            }}
          >
            Handovers this week
          </div>
          <div style={{ fontSize: 11, color: T.mut, marginBottom: 16 }}>
            Daily handover volume
          </div>
          <BarChart data={handoverReasons} color={T.a} height={90} />
          <div
            style={{
              marginTop: 16,
              background: T.aL,
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: T.aT,
                marginBottom: 2,
              }}
            >
              Peak: Friday
            </div>
            <div style={{ fontSize: 11, color: T.aT }}>
              8 handovers — mostly billing questions. Consider adding a Billing
              FAQ source.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Agent detail page (full-page, opened from list) ────────────────
function AgentDetailPage({ agent, sources, onBack, setView }) {
  const [tab, setTab] = useState("analytics");
  const [toggles, setToggles] = useState({
    0: true,
    1: false,
    2: true,
    3: false,
    4: false,
    5: true,
    6: true,
  });

  const ACTIONS_LIST = [
    { id: 0, name: "Invite team member", section: "Settings / Team" },
    { id: 1, name: "Remove team member", section: "Settings / Team" },
    { id: 2, name: "Connect Slack", section: "Integrations" },
    { id: 3, name: "Generate API key", section: "Integrations" },
    { id: 4, name: "Archive project", section: "Projects" },
    { id: 5, name: "Export report as CSV", section: "Reports" },
    { id: 6, name: "Create project", section: "Projects" },
  ];

  const agSrcs = sources.filter((s) => (agent?.sources || []).includes(s.id));

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: T.bg,
        overflow: "hidden",
      }}
    >
      {/* Page header */}
      <div
        style={{
          background: T.card,
          borderBottom: `1px solid ${T.brd}`,
          padding: "16px 32px",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: T.mut,
              cursor: "pointer",
              fontSize: 13,
              padding: "0 0 10px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            ← Back to agents
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  background: T.priL,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                ◎
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: T.txt }}>
                    {agent?.name}
                  </span>
                  <Tag c={agent?.status === "live" ? "green" : "gray"}>
                    {agent?.status}
                  </Tag>
                </div>
                <div style={{ fontSize: 13, color: T.mut, marginTop: 2 }}>
                  {agent?.goal}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn v="out" sz="sm">
                Edit goal
              </Btn>
              <Btn v="ghost" sz="sm">
                Pause agent
              </Btn>
            </div>
          </div>
          {/* sources pills */}
          {agSrcs.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              {agSrcs.map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: s.colorL,
                    borderRadius: 6,
                    padding: "3px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: T.txt,
                    cursor: "pointer",
                  }}
                  onClick={() => setView("sources")}
                >
                  <span>{s.icon}</span>
                  {s.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: T.card,
          borderBottom: `1px solid ${T.brd}`,
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex" }}>
          {[
            ["analytics", "Analytics"],
            ["actions", "Actions"],
            ["widget", "Widget"],
            ["settings", "Settings"],
          ].map(([k, l]) => (
            <div
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                color: tab === k ? T.pri : T.mut,
                borderBottom:
                  tab === k ? `2px solid ${T.pri}` : "2px solid transparent",
                userSelect: "none",
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {tab === "analytics" && <AgentAnalytics agent={agent} />}

        {tab === "actions" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div
                style={{
                  fontSize: 13,
                  color: T.mut,
                  marginBottom: 16,
                  lineHeight: 1.6,
                }}
              >
                Enable actions the agent can perform on behalf of users. Toggle
                off to guide users through the step instead.
              </div>
              <Card>
                {ACTIONS_LIST.map((a, i) => {
                  const on = toggles[a.id];
                  return (
                    <div
                      key={a.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "13px 18px",
                        borderBottom:
                          i < ACTIONS_LIST.length - 1
                            ? `1px solid ${T.brd}`
                            : "none",
                        background: on ? "#FAFFFD" : "white",
                        borderRadius:
                          i === 0
                            ? "12px 12px 0 0"
                            : i === ACTIONS_LIST.length - 1
                            ? "0 0 12px 12px"
                            : "0",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: T.txt,
                          }}
                        >
                          {a.name}
                        </div>
                        <div style={{ fontSize: 11, color: T.mut }}>
                          {a.section}
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          setToggles((t) => ({ ...t, [a.id]: !t[a.id] }))
                        }
                        style={{
                          width: 38,
                          height: 21,
                          borderRadius: 11,
                          background: on ? T.g : "#D1D5DB",
                          cursor: "pointer",
                          position: "relative",
                          flexShrink: 0,
                          transition: "background 0.15s",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 2.5,
                            left: on ? 19 : 2.5,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "white",
                            transition: "left 0.15s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          color: on ? T.gT : T.mut,
                          minWidth: 26,
                          fontWeight: 700,
                        }}
                      >
                        {on ? "ON" : "OFF"}
                      </span>
                    </div>
                  );
                })}
              </Card>
              <div
                style={{
                  marginTop: 14,
                  background: T.brd + "40",
                  borderRadius: 9,
                  padding: "11px 14px",
                  fontSize: 12,
                  color: T.mut,
                  lineHeight: 1.6,
                }}
              >
                <strong>Resolution order:</strong> Direct action → Guided flow →
                KB answer → Handover
              </div>
            </div>
          </div>
        )}

        {tab === "widget" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <WidgetPreview />
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <AgentSettings agent={agent} sources={agSrcs} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Agents list page ───────────────────────────────────────────────
function AgentsView({ agents, sources, setView, setPanel }) {
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (selectedAgent) {
    return (
      <AgentDetailPage
        agent={selectedAgent}
        sources={sources}
        onBack={() => setSelectedAgent(null)}
        setView={setView}
      />
    );
  }

  return (
    <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: T.txt,
                margin: "0 0 4px",
              }}
            >
              Adoption Agents
            </h1>
            <p style={{ fontSize: 13, color: T.mut, margin: 0 }}>
              Each agent has a specific goal and draws from one or more sources.
              Create via chat.
            </p>
          </div>
          <Btn v="soft" onClick={() => setView("chats")}>
            + New agent via chat
          </Btn>
        </div>
        {agents.map((ag) => {
          const agSrcs = sources.filter((s) =>
            (ag.sources || []).includes(s.id)
          );
          return (
            <Card
              key={ag.id}
              style={{
                marginBottom: 10,
                overflow: "hidden",
                cursor: ag.status === "live" ? "pointer" : "default",
                transition: "border-color 0.15s",
              }}
              onClick={() => {
                if (ag.status === "live") setSelectedAgent(ag);
              }}
              onMouseEnter={(e) => {
                if (ag.status === "live")
                  e.currentTarget.style.borderColor = T.pri;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.brd;
              }}
            >
              <div style={{ padding: "18px 22px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: ag.status === "live" ? 14 : 0,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          background: T.priL,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
                        }}
                      >
                        ◎
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: T.txt,
                          }}
                        >
                          {ag.name}
                        </div>
                        <div style={{ fontSize: 12, color: T.mut }}>
                          {ag.goal}
                        </div>
                      </div>
                      <Tag c={ag.status === "live" ? "green" : "gray"}>
                        {ag.status}
                      </Tag>
                    </div>
                  </div>
                  {ag.status === "live" && (
                    <div
                      style={{
                        display: "flex",
                        gap: 24,
                        flexShrink: 0,
                        marginLeft: 20,
                      }}
                    >
                      {[
                        [(ag.convs || 0).toLocaleString(), "Conversations"],
                        [ag.actions || 0, "Actions triggered"],
                      ].map(([v, l], i) => (
                        <div key={i} style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 700,
                              color: T.txt,
                              lineHeight: 1,
                            }}
                          >
                            {v}
                          </div>
                          <div
                            style={{ fontSize: 11, color: T.mut, marginTop: 2 }}
                          >
                            {l}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {ag.status === "live" && agSrcs.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      gap: 7,
                      flexWrap: "wrap",
                      marginBottom: 10,
                    }}
                  >
                    {agSrcs.map((s) => (
                      <div
                        key={s.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setView("sources");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          background: s.colorL,
                          borderRadius: 6,
                          padding: "3px 10px",
                          cursor: "pointer",
                          fontSize: 11,
                          fontWeight: 600,
                          color: T.txt,
                        }}
                      >
                        <span>{s.icon}</span>
                        {s.name}
                      </div>
                    ))}
                  </div>
                )}

                {ag.status === "live" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{ fontSize: 12, color: T.pri, fontWeight: 600 }}
                    >
                      Open config & analytics →
                    </span>
                  </div>
                )}

                {ag.status === "draft" && (
                  <div style={{ marginTop: 8 }}>
                    <Btn
                      v="soft"
                      sz="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setView("chats");
                      }}
                    >
                      Complete setup in chat →
                    </Btn>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("chats");
  // panel is now: null | "blueprint" | { type: "agent", agent: {...} }
  const [panel, setPanel] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [chatWidth, setChatWidth] = useState(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartW = useRef(0);
  const chatRef = useRef();

  const bpSource = {
    id: "bp_new",
    name: "Acme SaaS — Production blueprint",
    type: "blueprint",
    icon: "◈",
    color: T.pri,
    colorL: T.priL,
    created: "Apr 10, 2026",
    usedBy: ["Onboarding Agent"],
    status: "ready",
    detail: "18 actions · 7 sections · app.acme.com",
  };
  const kbSource = {
    id: "kb1",
    name: "Zendesk Help Center",
    type: "knowledge_base",
    icon: "📚",
    color: "#F59E0B",
    colorL: "#FEF3C7",
    created: "Apr 6, 2026",
    usedBy: ["Onboarding Agent"],
    status: "synced",
    detail: "247 articles · last synced 2h ago",
  };
  const newAgent = {
    id: "ag_new",
    name: "Onboarding Agent",
    goal: "Improve activation rate for new users",
    status: "live",
    convs: 0,
    actions: 7,
    sources: ["bp_new", "kb1"],
  };

  const [sources, setSources] = useState([
    bpSource,
    kbSource,
    ...STATIC_SOURCES.filter((s) => s.id !== "bp_new" && s.id !== "kb1"),
  ]);
  const [agents, setAgents] = useState([newAgent, ...STATIC_AGENTS]);

  const addSource = () =>
    setSources((s) =>
      s.find((x) => x.id === "bp_new") ? s : [bpSource, ...s]
    );
  const addAgentFn = () =>
    setAgents((a) => (a.find((x) => x.id === "ag_new") ? a : [newAgent, ...a]));

  // Derive sources for the currently open agent panel
  const panelAgentSources =
    panel?.type === "agent"
      ? sources.filter((s) => (panel.agent?.sources || []).includes(s.id))
      : sources.filter((s) => ["bp_new", "kb1"].includes(s.id));

  const panelIsOpen = panel !== null;

  // Panel label for header
  const panelLabel =
    panel === "blueprint"
      ? "Blueprint"
      : panel?.type === "agent"
      ? "Adoption Agent"
      : "";

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      const newW = Math.max(320, Math.min(900, dragStartW.current + delta));
      setChatWidth(newW);
    };
    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const onDragStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartW.current = chatRef.current?.offsetWidth || 600;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Inter',sans-serif",
        overflow: "hidden",
        background: T.bg,
      }}
    >
      <Sidebar
        view={view}
        setView={(v) => {
          setView(v);
          setPanel(null);
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div
          ref={chatRef}
          style={{
            width: panelIsOpen && view === "chats" ? chatWidth ?? 500 : "100%",
            minWidth: 320,
            flexShrink: 0,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {view === "chats" && (
            <ChatView
              panel={panel}
              setPanel={setPanel}
              addSource={addSource}
              addAgent={addAgentFn}
              sources={sources}
            />
          )}
          {view === "sources" && (
            <SourcesView sources={sources} setSources={setSources} />
          )}
          {view === "agents" && (
            <AgentsView
              agents={agents}
              sources={sources}
              setView={setView}
              setPanel={setPanel}
            />
          )}
        </div>
        {panelIsOpen && view === "chats" && (
          <>
            <div
              onMouseDown={onDragStart}
              style={{
                width: 5,
                cursor: "col-resize",
                flexShrink: 0,
                background: "transparent",
                borderLeft: `1px solid ${T.brd}`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = T.pri + "30")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            />
            <div
              style={{
                flex: 1,
                minWidth: 320,
                background: T.card,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${T.brd}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: T.mut,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {panelLabel}
                </span>
                <button
                  onClick={() => setPanel(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: T.mut,
                    cursor: "pointer",
                    fontSize: 18,
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {panel === "blueprint" && (
                  <BlueprintPanel
                    onOpenAgent={() => {
                      addAgentFn();
                      setPanel({ type: "agent", agent: newAgent });
                    }}
                  />
                )}
                {panel?.type === "agent" && (
                  <AgentPanel
                    onClose={() => setPanel(null)}
                    agent={panel.agent}
                    sources={panelAgentSources}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
