import { useState, useRef } from "react";

const RANK_META = [
  { label: "1st", accent: "#F5C842" },
  { label: "2nd", accent: "#A8B8C8" },
  { label: "3rd", accent: "#C87941" },
  { label: "4th", accent: "#7C6AF7" },
  { label: "5th", accent: "#3ECFCF" },
  { label: "6th", accent: "#F76A6A" },
  { label: "7th", accent: "#F7A043" },
  { label: "8th", accent: "#6AF78A" },
  { label: "9th", accent: "#F76ACF" },
  { label: "10th", accent: "#43AEF7" },
];

const initialItems = [
  { id: 1, name: "", image: null, comment: "" },
  { id: 2, name: "", image: null, comment: "" },
  { id: 3, name: "", image: null, comment: "" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;700;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#0a0a0f;}
.app{min-height:100vh;background:#0a0a0f;font-family:'Noto Sans JP',sans-serif;color:#e8e8f0;padding-bottom:60px;}

.header{position:relative;padding:32px 20px 24px;text-align:center;overflow:hidden;}
.header::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#1a0a2e 0%,#0a0a1f 100%);z-index:0;}
.header::after{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:300px;height:200px;background:radial-gradient(ellipse,rgba(124,106,247,0.35) 0%,transparent 70%);z-index:0;}
.header-inner{position:relative;z-index:1;}
.header-eyebrow{font-size:11px;letter-spacing:4px;color:#7C6AF7;font-weight:700;text-transform:uppercase;margin-bottom:6px;}
.header-title{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:4px;background:linear-gradient(90deg,#fff 0%,#a89cff 50%,#3ECFCF 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;}
.header-sub{font-size:12px;color:rgba(255,255,255,0.35);margin-top:8px;letter-spacing:1px;}

.container{max-width:480px;margin:0 auto;padding:24px 16px;}

.mode-toggle{display:flex;background:#141420;border:1px solid #2a2a3e;border-radius:14px;padding:4px;margin-bottom:24px;gap:4px;}
.mode-btn{flex:1;padding:9px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:0.5px;font-family:'Noto Sans JP',sans-serif;}
.mode-btn.active{background:linear-gradient(90deg,#7C6AF7,#3ECFCF);color:#fff;box-shadow:0 2px 12px rgba(124,106,247,0.4);}
.mode-btn:not(.active){background:transparent;color:rgba(255,255,255,0.35);}

.card{background:#141420;border:1px solid #2a2a3e;border-radius:18px;padding:20px;margin-bottom:20px;}
.field-label{font-size:10px;font-weight:700;letter-spacing:2px;color:#7C6AF7;text-transform:uppercase;margin-bottom:8px;display:block;}
.field-label+.field-label,.card .field-label:not(:first-child){margin-top:14px;}

.dark-input{width:100%;padding:12px 16px;background:#0e0e1a;border:1px solid #2a2a3e;border-radius:10px;color:#e8e8f0;font-size:15px;font-family:'Noto Sans JP',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
.dark-input:focus{border-color:#7C6AF7;box-shadow:0 0 0 3px rgba(124,106,247,0.15);}
.dark-input::placeholder{color:rgba(255,255,255,0.2);}

.section-label{font-size:10px;font-weight:700;letter-spacing:2px;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.section-label::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,#2a2a3e,transparent);}
.count-badge{font-size:10px;background:#1e1e2e;color:#7C6AF7;border-radius:6px;padding:2px 7px;font-weight:700;}

.rank-card{background:#141420;border:1px solid #2a2a3e;border-left-width:3px;border-radius:14px;margin-bottom:10px;overflow:hidden;transition:border-color 0.2s,transform 0.15s;}
.rank-card:hover{transform:translateY(-1px);}
.rank-header{display:flex;align-items:center;padding:12px 14px;gap:12px;}
.rank-number{font-family:'Bebas Neue',sans-serif;font-size:28px;line-height:1;min-width:40px;text-align:center;}
.rank-name-input{flex:1;background:transparent;border:none;font-size:15px;font-weight:700;color:#e8e8f0;outline:none;font-family:'Noto Sans JP',sans-serif;}
.rank-name-input::placeholder{color:rgba(255,255,255,0.2);}
.del-btn{background:none;border:none;color:rgba(255,255,255,0.2);font-size:14px;cursor:pointer;padding:4px;transition:color 0.2s;}
.del-btn:hover{color:#F76A6A;}
.divider{height:1px;background:#1e1e2e;}
.rank-body{padding:10px 14px 12px;display:flex;flex-direction:column;gap:8px;}
.img-row{display:flex;align-items:center;gap:10px;}
.img-thumb{width:48px;height:48px;border-radius:8px;object-fit:cover;border:1px solid #2a2a3e;}
.ghost-btn{padding:6px 14px;border-radius:20px;border:1px solid #3a3a5e;background:transparent;color:rgba(255,255,255,0.5);font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:'Noto Sans JP',sans-serif;}
.ghost-btn:hover{border-color:#7C6AF7;color:#a89cff;}
.ghost-btn.danger:hover{border-color:#F76A6A;color:#F76A6A;}
.comment-input{width:100%;padding:8px 12px;background:#0e0e1a;border:1px solid #1e1e2e;border-radius:8px;color:rgba(255,255,255,0.6);font-size:13px;font-family:'Noto Sans JP',sans-serif;outline:none;resize:none;transition:border-color 0.2s;}
.comment-input:focus{border-color:#7C6AF7;}
.comment-input::placeholder{color:rgba(255,255,255,0.15);}

.add-btn{width:100%;padding:14px;border-radius:12px;border:1px dashed #3a3a5e;background:transparent;color:rgba(255,255,255,0.3);font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;margin-bottom:20px;font-family:'Noto Sans JP',sans-serif;letter-spacing:1px;}
.add-btn:hover{border-color:#7C6AF7;color:#a89cff;}
.primary-btn{width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(90deg,#7C6AF7,#3ECFCF);color:#fff;font-size:15px;font-weight:900;cursor:pointer;letter-spacing:1px;font-family:'Noto Sans JP',sans-serif;box-shadow:0 4px 20px rgba(124,106,247,0.3);transition:opacity 0.2s,transform 0.15s;}
.primary-btn:hover{opacity:0.9;transform:translateY(-1px);}

.preview-wrap{background:#141420;border:1px solid #2a2a3e;border-radius:20px;overflow:hidden;}
.preview-head{padding:24px 20px 20px;background:linear-gradient(135deg,#1a0a2e,#0a1a2e);text-align:center;border-bottom:1px solid #2a2a3e;}
.preview-title{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:3px;background:linear-gradient(90deg,#fff 0%,#a89cff 60%,#3ECFCF 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
.preview-cat{font-size:11px;letter-spacing:3px;color:#7C6AF7;font-weight:700;text-transform:uppercase;margin-top:4px;}
.preview-list{padding:16px;}
.preview-item{display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:12px;margin-bottom:8px;background:#0e0e1a;border:1px solid #1e1e2e;border-left-width:3px;position:relative;}
.preview-rank{font-family:'Bebas Neue',sans-serif;font-size:24px;min-width:32px;text-align:center;line-height:1;}
.preview-img{width:44px;height:44px;border-radius:8px;object-fit:cover;border:1px solid #2a2a3e;}
.preview-name{font-size:15px;font-weight:700;color:#e8e8f0;flex:1;}
.preview-comment{font-size:12px;color:rgba(255,255,255,0.35);margin-top:3px;}

.share-row{display:flex;gap:8px;padding:0 16px 16px;}
.share-btn{flex:1;padding:11px 8px;border-radius:10px;border:none;font-size:12px;font-weight:800;cursor:pointer;letter-spacing:0.5px;font-family:'Noto Sans JP',sans-serif;transition:opacity 0.2s,transform 0.15s;}
.share-btn:hover{opacity:0.85;transform:translateY(-1px);}
.share-x{background:#111;color:#fff;border:1px solid #333;}
.share-line{background:#06C755;color:#fff;}
.share-embed{background:#1e1e2e;color:#a89cff;border:1px solid #3a3a5e;}

.embed-box{margin:0 16px 8px;padding:12px;background:#0e0e1a;border:1px solid #2a2a3e;border-radius:10px;font-family:monospace;font-size:11px;color:#3ECFCF;word-break:break-all;user-select:all;}
.copy-btn{margin:0 16px 12px;width:calc(100% - 32px);padding:10px;border-radius:10px;border:1px solid #7C6AF7;background:transparent;color:#a89cff;font-size:13px;font-weight:700;cursor:pointer;font-family:'Noto Sans JP',sans-serif;transition:all 0.2s;}
.copy-btn:hover{background:rgba(124,106,247,0.15);}
.back-btn{margin:0 16px 16px;width:calc(100% - 32px);padding:12px;border-radius:10px;border:1px solid #2a2a3e;background:transparent;color:rgba(255,255,255,0.4);font-size:13px;font-weight:700;cursor:pointer;font-family:'Noto Sans JP',sans-serif;transition:all 0.2s;}
.back-btn:hover{border-color:#3a3a5e;color:rgba(255,255,255,0.6);}
`;

export default function App() {
  const [mode, setMode] = useState("edit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState(initialItems);
  const [showEmbed, setShowEmbed] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRefs = useRef({});
  const nextId = useRef(4);

  const updateItem = (id, field, value) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  const handleImage = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateItem(id, "image", ev.target.result);
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    if (items.length >= 10) return;
    setItems(prev => [...prev, { id: nextId.current++, name: "", image: null, comment: "" }]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const embedCode = `<iframe src="${window.location.href}?embed=1" width="400" height="520" frameborder="0" style="border-radius:16px;border:none"></iframe>`;

  const handleShare = (platform) => {
    const text = encodeURIComponent(
      `【${title || "マイランキング"}】\n` +
      items.slice(0, 3).map((item, i) => `${["🥇","🥈","🥉"][i]} ${item.name || "?"}`).join("\n") +
      `\n\n#ランキングメーカー`
    );
    if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    else window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${text}`, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-inner">
            <div className="header-eyebrow">Create · Share · Rank</div>
            <div className="header-title">RANKING MAKER</div>
            <div className="header-sub">あなただけのランキングを作ろう</div>
          </div>
        </div>

        <div className="container">
          <div className="mode-toggle">
            <button className={`mode-btn ${mode === "edit" ? "active" : ""}`} onClick={() => setMode("edit")}>✏️　編集</button>
            <button className={`mode-btn ${mode === "preview" ? "active" : ""}`} onClick={() => setMode("preview")}>👁　プレビュー</button>
          </div>

          {mode === "edit" ? (
            <>
              <div className="card">
                <span className="field-label">タイトル</span>
                <input className="dark-input" placeholder="例：好きなラーメンTOP5" value={title} onChange={e => setTitle(e.target.value)} />
                <span className="field-label" style={{marginTop:14, display:"block"}}>カテゴリ（任意）</span>
                <input className="dark-input" placeholder="グルメ・エンタメ・スポーツ…" value={category} onChange={e => setCategory(e.target.value)} />
              </div>

              <div className="section-label">
                ランキング項目 <span className="count-badge">{items.length} / 10</span>
              </div>

              {items.map((item, idx) => {
                const meta = RANK_META[idx] || RANK_META[RANK_META.length - 1];
                return (
                  <div className="rank-card" key={item.id} style={{borderLeftColor: meta.accent}}>
                    <div className="rank-header">
                      <span className="rank-number" style={{color: meta.accent}}>{idx + 1}</span>
                      <input
                        className="rank-name-input"
                        placeholder={`${idx + 1}位の項目名を入力…`}
                        value={item.name}
                        onChange={e => updateItem(item.id, "name", e.target.value)}
                      />
                      <button className="del-btn" onClick={() => removeItem(item.id)}>✕</button>
                    </div>
                    <div className="divider" />
                    <div className="rank-body">
                      <div className="img-row">
                        {item.image && <img src={item.image} alt="" className="img-thumb" />}
                        <button className="ghost-btn" onClick={() => fileRefs.current[item.id]?.click()}>📷 画像</button>
                        <input type="file" accept="image/*" style={{display:"none"}}
                          ref={el => fileRefs.current[item.id] = el}
                          onChange={e => handleImage(item.id, e)} />
                        {item.image && (
                          <button className="ghost-btn danger" onClick={() => updateItem(item.id, "image", null)}>削除</button>
                        )}
                      </div>
                      <textarea
                        className="comment-input"
                        placeholder="コメントを追加…"
                        rows={2}
                        value={item.comment}
                        onChange={e => updateItem(item.id, "comment", e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}

              {items.length < 10 && (
                <button className="add-btn" onClick={addItem}>＋ 項目を追加（最大10位）</button>
              )}
              <button className="primary-btn" onClick={() => setMode("preview")}>プレビューを確認 →</button>
            </>
          ) : (
            <div className="preview-wrap">
              <div className="preview-head">
                <div className="preview-title">{title || "UNTITLED RANKING"}</div>
                {category && <div className="preview-cat"># {category}</div>}
              </div>
              <div className="preview-list">
                {items.map((item, idx) => {
                  const meta = RANK_META[idx] || RANK_META[RANK_META.length - 1];
                  return (
                    <div className="preview-item" key={item.id} style={{borderLeftColor: meta.accent}}>
                      <span className="preview-rank" style={{color: meta.accent}}>{idx + 1}</span>
                      {item.image && <img src={item.image} alt="" className="preview-img" />}
                      <div style={{flex:1}}>
                        <div className="preview-name">{item.name || <span style={{opacity:0.3}}>未入力</span>}</div>
                        {item.comment && <div className="preview-comment">{item.comment}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="share-row">
                <button className="share-btn share-x" onClick={() => handleShare("twitter")}>𝕏 ポスト</button>
                <button className="share-btn share-line" onClick={() => handleShare("line")}>LINE</button>
                <button className="share-btn share-embed" onClick={() => setShowEmbed(!showEmbed)}>&lt;/&gt; 埋め込み</button>
              </div>

              {showEmbed && (
                <>
                  <div className="embed-box">{embedCode}</div>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? "✅ コピーしました！" : "📋 コードをコピー"}
                  </button>
                </>
              )}

              <button className="back-btn" onClick={() => setMode("edit")}>← 編集に戻る</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
