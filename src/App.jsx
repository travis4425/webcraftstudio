import { useState, useEffect, useRef } from "react";

const DOMAIN = "webcraft.id.vn";
const SITE_URL = `https://${DOMAIN}`;

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { home:"Home", about:"About", services:"Services", portfolio:"Portfolio", contact:"Contact", getQuote:"Get a Quote" },
    hero: {
      badge:"✦ Modern Web Agency",
      h1a:"We Design Modern",
      h1b:"Websites That Grow",
      h1c:"Your Business",
      sub:"WebCraft Studio crafts beautiful, high-performance websites and digital experiences for startups and businesses across Vietnam and beyond.",
      cta1:"View Portfolio",
      cta2:"Get a Quote",
      stat1:"Projects Delivered",
      stat2:"Happy Clients",
      stat3:"Years Experience",
      domain:`🌐 ${DOMAIN}`,
    },
    about: {
      badge:"Our Team",
      h2:"Three Minds. One Studio.",
      sub:"We're a tight-knit trio of designers and developers who believe great websites are born from the intersection of art and engineering.",
      mission:"Our Mission",
      missionText:"To empower businesses with world-class digital presence — built fast, designed beautifully, and engineered to last.",
      vision:"Our Vision",
      visionText:"To become Vietnam's most trusted boutique web agency, where every pixel and every line of code serves a purpose.",
      members:[
        { name:"Minh Anh", role:"UI/UX Designer", bio:"Passionate about crafting intuitive interfaces that delight users. 4 years of Figma, Adobe XD and design systems.", skills:["Figma","Adobe XD","Motion Design","Prototyping","Design Systems"] },
        { name:"Tuấn Kiệt", role:"Frontend Developer", bio:"React enthusiast with a sharp eye for pixel-perfect implementation. Turns designs into fast, accessible web experiences.", skills:["React","Next.js","TailwindCSS","TypeScript","Framer Motion"] },
        { name:"Phương Linh", role:"Backend Developer", bio:"Architect of robust APIs and scalable systems. Loves clean code and databases that never sleep.", skills:["Node.js","Express","SQL Server","PostgreSQL","AWS"] },
      ],
    },
    services: {
      badge:"What We Do",
      h2:"Services Built for Growth",
      sub:"From concept to launch — we cover every layer of your digital product.",
      list:[
        { icon:"🎨", title:"UI/UX Design", desc:"Research-driven, user-centered design that converts visitors into customers. Every screen crafted with intention.", price:["$299","$599","$999"] },
        { icon:"💻", title:"Website Design", desc:"Custom, responsive websites that reflect your brand identity and leave a lasting impression.", price:["$499","$999","$1,799"] },
        { icon:"⚙️", title:"Full-Stack Development", desc:"End-to-end web applications built on modern stacks — React, Node.js, databases, APIs and cloud deployment.", price:["$999","$2,499","$4,999"] },
        { icon:"🛡️", title:"Maintenance & Support", desc:"Post-launch care packages: hosting management, updates, security patches and performance monitoring.", price:["$49/mo","$99/mo","$199/mo"] },
      ],
      plans:["Basic","Standard","Premium"],
    },
    portfolio: {
      badge:"Our Work",
      h2:"Projects We're Proud Of",
      sub:"A curated selection of work spanning startups, enterprises and non-profits.",
      filters:["All","React","Node.js","UI/UX","E-Commerce"],
      projects:[
        { title:"FloodRescue Platform", cat:"React", tags:["React","Node.js","Socket.io","SQL Server"], desc:"Real-time flood rescue coordination system with role-based access for 5 user types, GPS tracking and live dashboards.", img:"🌊" },
        { title:"LuxeShop E-Commerce", cat:"E-Commerce", tags:["Next.js","Stripe","PostgreSQL","TailwindCSS"], desc:"Full-featured online store with payment integration, inventory management and analytics dashboard.", img:"🛍️" },
        { title:"MediBook Clinic App", cat:"UI/UX", tags:["Figma","React","Node.js","MongoDB"], desc:"Patient appointment booking and medical records management system for a chain of 12 clinics.", img:"🏥" },
        { title:"EduLearn LMS", cat:"React", tags:["React","Django","PostgreSQL","AWS S3"], desc:"Learning management system supporting 10,000+ students with video streaming and live quiz features.", img:"📚" },
        { title:"LogiTrack Dashboard", cat:"Node.js", tags:["Vue.js","Node.js","MySQL","Docker"], desc:"Real-time logistics and fleet tracking dashboard with advanced analytics and route optimization.", img:"🚚" },
        { title:"ArtisanBrew Brand Site", cat:"UI/UX", tags:["Figma","Webflow","GSAP"], desc:"Brand identity and website design for a premium craft brewery — editorial aesthetic with rich animations.", img:"🍺" },
      ],
    },
    testimonials: {
      badge:"Client Love",
      h2:"What Our Clients Say",
      list:[
        { name:"Nguyễn Văn An", role:"CEO, TechViet Solutions", text:"WebCraft Studio delivered our platform 2 weeks ahead of schedule. The code quality and design exceeded every expectation. Truly professional.", rating:5 },
        { name:"Sarah Mitchell", role:"Founder, Bloom Agency", text:"Working with this team was effortless. They understood our vision immediately and translated it into something even better than we imagined.", rating:5 },
        { name:"Trần Thị Mai", role:"Marketing Director, FoodChain VN", text:"Our new website increased conversions by 40% in the first month. The UI/UX work is exceptional. We'll be back for our mobile app.", rating:5 },
      ],
    },
    contact: {
      badge:"Let's Build Together",
      h2:"Start Your Project Today",
      sub:"Tell us about your vision. We'll get back to you within 24 hours.",
      name:"Your Name",
      email:"Email Address",
      project:"Project Type",
      msg:"Tell us about your project...",
      send:"Send Message",
      sending:"Sending...",
      sent:"Message sent! We'll be in touch soon. 🎉",
      info:[`hello@${DOMAIN}`,"+84 (0) 123 456 789","Ho Chi Minh City, Vietnam"],
    },
    footer: { copy:`© 2025 WebCraft Studio · ${SITE_URL} · Crafted with ❤️ in Vietnam.` },
  },
  vi: {
    nav: { home:"Trang chủ", about:"Về chúng tôi", services:"Dịch vụ", portfolio:"Dự án", contact:"Liên hệ", getQuote:"Nhận báo giá" },
    hero: {
      badge:"✦ Studio thiết kế web hiện đại",
      h1a:"Thiết Kế Website",
      h1b:"Hiện Đại Giúp",
      h1c:"Doanh Nghiệp Bứt Phá",
      sub:"WebCraft Studio tạo ra những website đẹp, hiệu suất cao và trải nghiệm kỹ thuật số ấn tượng cho startup và doanh nghiệp tại Việt Nam.",
      cta1:"Xem Dự Án",
      cta2:"Nhận Báo Giá",
      stat1:"Dự án hoàn thành",
      stat2:"Khách hàng hài lòng",
      stat3:"Năm kinh nghiệm",
      domain:`🌐 ${DOMAIN}`,
    },
    about: {
      badge:"Đội ngũ của chúng tôi",
      h2:"Ba Cá Nhân. Một Studio.",
      sub:"Chúng tôi là bộ ba nhà thiết kế và lập trình viên tin rằng website tuyệt vời được tạo ra từ giao điểm của nghệ thuật và kỹ thuật.",
      mission:"Sứ Mệnh",
      missionText:"Trao quyền cho doanh nghiệp với sự hiện diện kỹ thuật số đẳng cấp thế giới — xây dựng nhanh, thiết kế đẹp và bền vững theo thời gian.",
      vision:"Tầm Nhìn",
      visionText:"Trở thành studio web boutique đáng tin cậy nhất Việt Nam, nơi mỗi pixel và mỗi dòng code đều có mục đích.",
      members:[
        { name:"Minh Anh", role:"Nhà thiết kế UI/UX", bio:"Đam mê tạo ra giao diện trực quan mang lại trải nghiệm tuyệt vời. 4 năm kinh nghiệm với Figma và hệ thống thiết kế.", skills:["Figma","Adobe XD","Motion Design","Prototyping","Design Systems"] },
        { name:"Tuấn Kiệt", role:"Lập trình viên Frontend", bio:"Chuyên gia React với con mắt tinh tường cho thiết kế pixel-perfect. Biến thiết kế thành trải nghiệm web nhanh và dễ tiếp cận.", skills:["React","Next.js","TailwindCSS","TypeScript","Framer Motion"] },
        { name:"Phương Linh", role:"Lập trình viên Backend", bio:"Kiến trúc sư của các API mạnh mẽ và hệ thống có thể mở rộng. Yêu thích code sạch và cơ sở dữ liệu ổn định.", skills:["Node.js","Express","SQL Server","PostgreSQL","AWS"] },
      ],
    },
    services: {
      badge:"Dịch vụ của chúng tôi",
      h2:"Dịch Vụ Kiến Tạo Tăng Trưởng",
      sub:"Từ ý tưởng đến ra mắt — chúng tôi bao phủ mọi tầng của sản phẩm kỹ thuật số.",
      list:[
        { icon:"🎨", title:"Thiết kế UI/UX", desc:"Thiết kế lấy người dùng làm trung tâm, dựa trên nghiên cứu, giúp chuyển đổi khách truy cập thành khách hàng.", price:["7.500.000₫","15.000.000₫","25.000.000₫"] },
        { icon:"💻", title:"Thiết kế Website", desc:"Website tùy chỉnh, responsive phản ánh bản sắc thương hiệu của bạn và để lại ấn tượng lâu dài.", price:["12.000.000₫","24.000.000₫","45.000.000₫"] },
        { icon:"⚙️", title:"Lập trình Full-Stack", desc:"Ứng dụng web từ đầu đến cuối trên nền tảng hiện đại — React, Node.js, cơ sở dữ liệu, API và triển khai cloud.", price:["25.000.000₫","60.000.000₫","120.000.000₫"] },
        { icon:"🛡️", title:"Bảo trì & Hỗ trợ", desc:"Gói chăm sóc sau ra mắt: quản lý hosting, cập nhật, vá bảo mật và giám sát hiệu suất.", price:["1.200.000₫/th","2.400.000₫/th","4.800.000₫/th"] },
      ],
      plans:["Cơ bản","Tiêu chuẩn","Cao cấp"],
    },
    portfolio: {
      badge:"Công việc của chúng tôi",
      h2:"Những Dự Án Chúng Tôi Tự Hào",
      sub:"Tuyển tập công việc từ các startup, doanh nghiệp và tổ chức phi lợi nhuận.",
      filters:["Tất cả","React","Node.js","UI/UX","Thương mại điện tử"],
      projects:[
        { title:"Nền tảng Cứu hộ Lũ lụt", cat:"React", tags:["React","Node.js","Socket.io","SQL Server"], desc:"Hệ thống điều phối cứu hộ lũ lụt thời gian thực với quyền truy cập dựa trên vai trò cho 5 loại người dùng.", img:"🌊" },
        { title:"LuxeShop Thương mại điện tử", cat:"Thương mại điện tử", tags:["Next.js","Stripe","PostgreSQL","TailwindCSS"], desc:"Cửa hàng trực tuyến đầy đủ tính năng với tích hợp thanh toán và bảng điều khiển phân tích.", img:"🛍️" },
        { title:"Ứng dụng Phòng khám MediBook", cat:"UI/UX", tags:["Figma","React","Node.js","MongoDB"], desc:"Hệ thống đặt lịch khám và quản lý hồ sơ y tế cho chuỗi 12 phòng khám.", img:"🏥" },
        { title:"Hệ thống Học tập EduLearn", cat:"React", tags:["React","Django","PostgreSQL","AWS S3"], desc:"Hệ thống quản lý học tập hỗ trợ 10.000+ học viên với phát trực tiếp video và tính năng quiz.", img:"📚" },
        { title:"Bảng điều khiển LogiTrack", cat:"Node.js", tags:["Vue.js","Node.js","MySQL","Docker"], desc:"Bảng điều khiển theo dõi logistics và đội xe thời gian thực với phân tích nâng cao.", img:"🚚" },
        { title:"Trang thương hiệu ArtisanBrew", cat:"UI/UX", tags:["Figma","Webflow","GSAP"], desc:"Thiết kế nhận diện thương hiệu và website cho nhà máy bia thủ công cao cấp.", img:"🍺" },
      ],
    },
    testimonials: {
      badge:"Khách hàng yêu thích",
      h2:"Khách Hàng Nói Gì Về Chúng Tôi",
      list:[
        { name:"Nguyễn Văn An", role:"Giám đốc, TechViet Solutions", text:"WebCraft Studio đã bàn giao nền tảng của chúng tôi trước 2 tuần. Chất lượng code và thiết kế vượt mọi kỳ vọng. Thực sự chuyên nghiệp.", rating:5 },
        { name:"Sarah Mitchell", role:"Nhà sáng lập, Bloom Agency", text:"Làm việc với nhóm này thật dễ dàng. Họ hiểu tầm nhìn của chúng tôi ngay lập tức và dịch nó thành thứ gì đó còn tốt hơn.", rating:5 },
        { name:"Trần Thị Mai", role:"Giám đốc Marketing, FoodChain VN", text:"Website mới của chúng tôi tăng tỷ lệ chuyển đổi 40% trong tháng đầu tiên. Công việc UI/UX thật xuất sắc.", rating:5 },
      ],
    },
    contact: {
      badge:"Hãy cùng xây dựng",
      h2:"Bắt Đầu Dự Án Của Bạn Ngay Hôm Nay",
      sub:"Kể cho chúng tôi nghe về tầm nhìn của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      name:"Họ và tên",
      email:"Địa chỉ Email",
      project:"Loại dự án",
      msg:"Hãy kể về dự án của bạn...",
      send:"Gửi Tin Nhắn",
      sending:"Đang gửi...",
      sent:"Tin nhắn đã gửi! Chúng tôi sẽ liên hệ sớm. 🎉",
      info:[`hello@${DOMAIN}`,"+84 (0) 123 456 789","TP. Hồ Chí Minh, Việt Nam"],
    },
    footer: { copy:`© 2025 WebCraft Studio · ${SITE_URL} · Được tạo ra với ❤️ tại Việt Nam.` },
  },
};

const avatarColors = ["#3B82F6","#06B6D4","#8B5CF6"];

export default function App() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name:"", email:"", project:"", msg:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});
  const t = T[lang];

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.08 }
    );
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setActive(id); setMenuOpen(false);
  };

  const handleSend = () => {
    if (!formState.name || !formState.email) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setFormState({ name:"", email:"", project:"", msg:"" }); }, 1800);
  };

  const catMap = { "Tất cả":"All","Thương mại điện tử":"E-Commerce" };
  const filterKey = catMap[filter] || filter;
  const enProjects = T.en.portfolio.projects;
  const filteredProjects = filterKey === "All"
    ? t.portfolio.projects
    : t.portfolio.projects.filter((_, i) => enProjects[i]?.cat === filterKey);

  const bg    = dark ? "#080C14" : "#F8FAFF";
  const bg2   = dark ? "#0D1321" : "#EEF2FF";
  const card  = dark ? "#0F172A" : "#FFFFFF";
  const border= dark ? "#1E2D4A" : "#DBEAFE";
  const text  = dark ? "#F1F5F9" : "#0F172A";
  const muted = dark ? "#94A3B8" : "#64748B";
  const accent = "#3B82F6";
  const accent2= "#06B6D4";
  const glass  = dark ? "rgba(8,12,20,0.85)" : "rgba(248,250,255,0.9)";

  const fadeIn = (id, delay=0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <div style={{ fontFamily:"'Sora',sans-serif", background:bg, color:text, minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${bg};}
        ::-webkit-scrollbar-thumb{background:${accent};border-radius:3px;}
        .btn-p{background:linear-gradient(135deg,${accent},${accent2});color:#fff;border:none;padding:14px 30px;border-radius:12px;font-family:'Sora',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:all .3s;letter-spacing:.2px;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(59,130,246,.4);}
        .btn-g{background:transparent;color:${text};border:1.5px solid ${border};padding:13px 26px;border-radius:12px;font-family:'Sora',sans-serif;font-weight:500;font-size:15px;cursor:pointer;transition:all .3s;}
        .btn-g:hover{border-color:${accent};color:${accent};background:${dark?"rgba(59,130,246,.07)":"rgba(59,130,246,.04)"};}
        .nav-a{cursor:pointer;font-size:14px;font-weight:500;color:${muted};transition:color .25s;padding:5px 0;position:relative;}
        .nav-a:hover,.nav-a.on{color:${text};}
        .nav-a.on::after{content:'';position:absolute;bottom:-3px;left:0;width:100%;height:2px;background:linear-gradient(90deg,${accent},${accent2});border-radius:2px;}
        .ch:hover{transform:translateY(-7px) !important;box-shadow:0 28px 56px rgba(0,0,0,${dark?.35:.12}) !important;}
        .tag{display:inline-block;background:${dark?"rgba(59,130,246,.13)":"rgba(59,130,246,.09)"};color:${accent};border:1px solid ${dark?"rgba(59,130,246,.28)":"rgba(59,130,246,.2)"};padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:.3px;}
        .sk{display:inline-block;background:${dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.04)"};color:${muted};padding:5px 12px;border-radius:8px;font-size:11.5px;font-weight:500;margin:3px;}
        input,textarea,select{background:${dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)"};border:1.5px solid ${border};border-radius:12px;padding:13px 16px;font-family:'Sora',sans-serif;font-size:14px;color:${text};width:100%;outline:none;transition:border-color .3s;}
        input:focus,textarea:focus,select:focus{border-color:${accent};box-shadow:0 0 0 3px ${dark?"rgba(59,130,246,.1)":"rgba(59,130,246,.07)"};}
        input::placeholder,textarea::placeholder{color:${muted};}
        select option{background:${card};color:${text};}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:.9}}
        @keyframes gshift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .fl{animation:float 6s ease-in-out infinite;}
        .fl2{animation:float 8s ease-in-out 1.5s infinite;}
        .gt{background:linear-gradient(135deg,#60A5FA,#38BDF8,#818CF8);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gshift 4s ease infinite;}
        .mesh{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;}
        @media(max-width:900px){
          .d-nav{display:none !important;}
          .hbg{display:flex !important;}
          .two-col{grid-template-columns:1fr !important;}
          .three-col{grid-template-columns:1fr !important;}
        }
        @media(max-width:600px){
          .hero-grid{grid-template-columns:1fr !important;}
          .hero-visual{display:none !important;}
          .stat-row{gap:24px !important;}
          .form-row{grid-template-columns:1fr !important;}
        }
      `}</style>

      {/* ─── NAV ─────────────────────────────── */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:200,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",background:glass,borderBottom:`1px solid ${border}` }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",height:70,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 6px 18px rgba(59,130,246,.4)` }}>
              <span style={{ color:"#fff",fontWeight:800,fontSize:15,fontFamily:"Space Grotesk" }}>W</span>
            </div>
            <span style={{ fontWeight:700,fontSize:16,letterSpacing:"-.3px",fontFamily:"Space Grotesk" }}>
              WebCraft<span style={{ color:accent }}>Studio</span>
            </span>
          </div>

          <div className="d-nav" style={{ display:"flex",alignItems:"center",gap:28 }}>
            {Object.entries(t.nav).filter(([k]) => k!=="getQuote").map(([k,v]) => (
              <span key={k} className={`nav-a ${active===k?"on":""}`} onClick={() => scrollTo(k)}>{v}</span>
            ))}
          </div>

          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <button onClick={() => setLang(l => l==="en"?"vi":"en")} style={{ background:dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)",border:`1px solid ${border}`,borderRadius:8,padding:"6px 12px",color:text,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"Sora" }}>
              {lang==="en"?"🇻🇳 VI":"🇺🇸 EN"}
            </button>
            <button onClick={() => setDark(d => !d)} style={{ width:38,height:38,borderRadius:9,background:dark?"rgba(255,255,255,.06)":"rgba(0,0,0,.05)",border:`1px solid ${border}`,cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center" }}>
              {dark?"☀️":"🌙"}
            </button>
            <button className="btn-p" style={{ padding:"9px 18px",fontSize:14,borderRadius:10 }} onClick={() => scrollTo("contact")}>
              {t.nav.getQuote}
            </button>
            <button className="hbg" onClick={() => setMenuOpen(m => !m)} style={{ display:"none",width:38,height:38,borderRadius:9,background:"transparent",border:`1px solid ${border}`,cursor:"pointer",fontSize:18,color:text,alignItems:"center",justifyContent:"center" }}>
              {menuOpen?"✕":"☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:glass,backdropFilter:"blur(20px)",padding:"16px 24px 24px",borderTop:`1px solid ${border}`,display:"flex",flexDirection:"column",gap:18 }}>
            {Object.entries(t.nav).filter(([k]) => k!=="getQuote").map(([k,v]) => (
              <span key={k} style={{ fontSize:16,fontWeight:500,color:active===k?accent:text,cursor:"pointer" }} onClick={() => scrollTo(k)}>{v}</span>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────── */}
      <section id="home" ref={setRef("home")} style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",padding:"100px 24px 80px" }}>
        <div className="mesh" style={{ width:700,height:700,background:dark?"rgba(59,130,246,.12)":"rgba(59,130,246,.08)",top:-200,right:-200 }} />
        <div className="mesh" style={{ width:500,height:500,background:dark?"rgba(6,182,212,.08)":"rgba(6,182,212,.06)",bottom:-100,left:-150 }} />
        <div className="fl" style={{ position:"absolute",top:"22%",right:"7%",width:70,height:70,borderRadius:18,background:`linear-gradient(135deg,${accent},${accent2})`,opacity:.14,pointerEvents:"none" }} />
        <div className="fl2" style={{ position:"absolute",bottom:"28%",right:"16%",width:45,height:45,borderRadius:"50%",background:`linear-gradient(135deg,${accent2},#8B5CF6)`,opacity:.18,pointerEvents:"none" }} />

        <div style={{ maxWidth:1280,margin:"0 auto",width:"100%" }}>
          <div className="hero-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
            <div style={{ ...fadeIn("home") }}>
              {/* Domain badge */}
              <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:dark?"rgba(59,130,246,.12)":"rgba(59,130,246,.08)",border:`1px solid ${dark?"rgba(59,130,246,.25)":"rgba(59,130,246,.18)"}`,borderRadius:20,padding:"6px 16px",fontSize:13,fontWeight:600,color:accent,marginBottom:20,cursor:"pointer" }} onClick={() => window.open(SITE_URL,"_blank")}>
                {t.hero.domain}
              </div>
              <div className="tag" style={{ marginBottom:20,display:"block" }}>{t.hero.badge}</div>
              <h1 style={{ fontSize:"clamp(38px,4.5vw,68px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-2px",marginBottom:24,fontFamily:"Space Grotesk" }}>
                {t.hero.h1a}<br/>
                <span className="gt">{t.hero.h1b}</span><br/>
                {t.hero.h1c}
              </h1>
              <p style={{ fontSize:16.5,color:muted,lineHeight:1.85,maxWidth:460,marginBottom:36 }}>{t.hero.sub}</p>
              <div style={{ display:"flex",gap:14,flexWrap:"wrap",marginBottom:50 }}>
                <button className="btn-p" onClick={() => scrollTo("portfolio")}>{t.hero.cta1} →</button>
                <button className="btn-g" onClick={() => scrollTo("contact")}>{t.hero.cta2}</button>
              </div>
              <div className="stat-row" style={{ display:"flex",gap:36 }}>
                {[["48+",t.hero.stat1],["35+",t.hero.stat2],["4+",t.hero.stat3]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:30,fontWeight:800,color:accent,fontFamily:"Space Grotesk",lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:12.5,color:muted,marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual" style={{ display:"flex",justifyContent:"center",position:"relative" }}>
              <div className="fl" style={{ width:"min(420px,85vw)",height:"min(420px,85vw)",borderRadius:"40% 60% 55% 45%/45% 55% 65% 35%",background:`linear-gradient(135deg,${dark?"rgba(59,130,246,.18)":"rgba(59,130,246,.1)"},${dark?"rgba(6,182,212,.12)":"rgba(6,182,212,.08)"})`,border:`1px solid ${dark?"rgba(59,130,246,.18)":"rgba(59,130,246,.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"clamp(80px,12vw,120px)" }}>
                🚀
              </div>
              {[{ icon:"⚛️",label:"React",l:"-12%",t:"18%",d:0 },{ icon:"🎨",label:"UI/UX",l:"82%",t:"8%",d:1 },{ icon:"⚙️",label:"Node.js",l:"78%",t:"68%",d:.5 }].map(({ icon,label,l,t:top,d }) => (
                <div key={label} className="fl" style={{ position:"absolute",left:l,top:top,background:card,border:`1px solid ${border}`,borderRadius:12,padding:"9px 14px",display:"flex",alignItems:"center",gap:7,fontSize:13,fontWeight:600,boxShadow:`0 8px 24px rgba(0,0,0,${dark?.28:.08})`,animationDelay:`${d}s` }}>
                  <span style={{ fontSize:17 }}>{icon}</span>{label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ───────────────────────────── */}
      <section id="about" ref={setRef("about")} style={{ padding:"96px 24px",background:bg2 }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:72,...fadeIn("about") }}>
            <div className="tag" style={{ marginBottom:14 }}>{t.about.badge}</div>
            <h2 style={{ fontSize:"clamp(30px,3.8vw,52px)",fontWeight:800,fontFamily:"Space Grotesk",letterSpacing:"-1px",marginBottom:16 }}>{t.about.h2}</h2>
            <p style={{ color:muted,fontSize:16.5,maxWidth:540,margin:"0 auto" }}>{t.about.sub}</p>
          </div>

          <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,marginBottom:48 }}>
            {t.about.members.map((m,i) => (
              <div key={m.name} className="ch" style={{ background:card,border:`1px solid ${border}`,borderRadius:22,padding:28,transition:"all .4s",...fadeIn("about",i*0.1) }}>
                <div style={{ width:64,height:64,borderRadius:18,background:avatarColors[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:18,boxShadow:`0 8px 20px ${avatarColors[i]}38` }}>
                  {["👩‍🎨","👨‍💻","👩‍💻"][i]}
                </div>
                <h3 style={{ fontSize:21,fontWeight:700,marginBottom:4,fontFamily:"Space Grotesk" }}>{m.name}</h3>
                <div style={{ color:accent,fontSize:13.5,fontWeight:600,marginBottom:12 }}>{m.role}</div>
                <p style={{ color:muted,fontSize:13.5,lineHeight:1.75,marginBottom:18 }}>{m.bio}</p>
                <div>{m.skills.map(s => <span key={s} className="sk">{s}</span>)}</div>
              </div>
            ))}
          </div>

          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }}>
            {[
              { title:t.about.mission,text:t.about.missionText,icon:"🎯",g:`linear-gradient(135deg,${accent},#6366F1)` },
              { title:t.about.vision,text:t.about.visionText,icon:"🔭",g:`linear-gradient(135deg,${accent2},#0EA5E9)` },
            ].map(({ title,text:txt,icon,g }) => (
              <div key={title} style={{ background:card,border:`1px solid ${border}`,borderRadius:22,padding:32,display:"flex",gap:20,...fadeIn("about") }}>
                <div style={{ width:52,height:52,borderRadius:14,background:g,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0 }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize:19,fontWeight:700,marginBottom:8,fontFamily:"Space Grotesk" }}>{title}</h3>
                  <p style={{ color:muted,fontSize:14,lineHeight:1.8 }}>{txt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────── */}
      <section id="services" ref={setRef("services")} style={{ padding:"96px 24px",background:bg }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:72,...fadeIn("services") }}>
            <div className="tag" style={{ marginBottom:14 }}>{t.services.badge}</div>
            <h2 style={{ fontSize:"clamp(30px,3.8vw,52px)",fontWeight:800,fontFamily:"Space Grotesk",letterSpacing:"-1px",marginBottom:16 }}>{t.services.h2}</h2>
            <p style={{ color:muted,fontSize:16.5,maxWidth:480,margin:"0 auto" }}>{t.services.sub}</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:22 }}>
            {t.services.list.map((svc,i) => (
              <div key={svc.title} className="ch" style={{ background:card,border:`1px solid ${border}`,borderRadius:22,overflow:"hidden",transition:"all .4s",...fadeIn("services",i*.08) }}>
                <div style={{ background:`linear-gradient(135deg,${accent}14,${accent2}0a)`,padding:"26px 26px 22px",borderBottom:`1px solid ${border}` }}>
                  <div style={{ fontSize:34,marginBottom:10 }}>{svc.icon}</div>
                  <h3 style={{ fontSize:19,fontWeight:700,marginBottom:8,fontFamily:"Space Grotesk" }}>{svc.title}</h3>
                  <p style={{ color:muted,fontSize:13.5,lineHeight:1.75 }}>{svc.desc}</p>
                </div>
                <div style={{ padding:"18px 26px 26px" }}>
                  <div style={{ fontSize:11.5,fontWeight:700,color:muted,letterSpacing:"1px",textTransform:"uppercase",marginBottom:14 }}>Pricing</div>
                  {t.services.plans.map((plan,j) => (
                    <div key={plan} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:j<2?`1px solid ${border}`:"none" }}>
                      <span style={{ fontSize:13.5,color:muted }}>{plan}</span>
                      <span style={{ fontSize:14.5,fontWeight:700,color:j===2?accent:text }}>{svc.price[j]}</span>
                    </div>
                  ))}
                  <button className="btn-p" style={{ width:"100%",marginTop:18,padding:"12px",fontSize:14,borderRadius:11 }} onClick={() => scrollTo("contact")}>
                    Get Started →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ───────────────────────── */}
      <section id="portfolio" ref={setRef("portfolio")} style={{ padding:"96px 24px",background:bg2 }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:52,...fadeIn("portfolio") }}>
            <div className="tag" style={{ marginBottom:14 }}>{t.portfolio.badge}</div>
            <h2 style={{ fontSize:"clamp(30px,3.8vw,52px)",fontWeight:800,fontFamily:"Space Grotesk",letterSpacing:"-1px",marginBottom:16 }}>{t.portfolio.h2}</h2>
            <p style={{ color:muted,fontSize:16.5,maxWidth:480,margin:"0 auto 32px" }}>{t.portfolio.sub}</p>
            <div style={{ display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap" }}>
              {t.portfolio.filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding:"8px 18px",borderRadius:20,fontSize:13.5,fontWeight:600,cursor:"pointer",fontFamily:"Sora",transition:"all .25s",background:filter===f?`linear-gradient(135deg,${accent},${accent2})`:card,color:filter===f?"#fff":muted,border:filter===f?"none":`1px solid ${border}` }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:22 }}>
            {filteredProjects.map((proj,i) => (
              <div key={proj.title} className="ch" style={{ background:card,border:`1px solid ${border}`,borderRadius:22,overflow:"hidden",transition:"all .4s",...fadeIn("portfolio",i*.07) }}>
                <div style={{ height:170,background:`linear-gradient(135deg,${accent}18,${accent2}10)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:60,position:"relative" }}>
                  {proj.img}
                  <div style={{ position:"absolute",top:12,right:12 }}>
                    <div className="tag" style={{ fontSize:11 }}>{proj.tags[0]}</div>
                  </div>
                </div>
                <div style={{ padding:22 }}>
                  <h3 style={{ fontSize:17.5,fontWeight:700,marginBottom:7,fontFamily:"Space Grotesk" }}>{proj.title}</h3>
                  <p style={{ color:muted,fontSize:13.5,lineHeight:1.7,marginBottom:14 }}>{proj.desc}</p>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {proj.tags.map(tag => <span key={tag} className="tag" style={{ fontSize:11 }}>{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────── */}
      <section id="testimonials" ref={setRef("testimonials")} style={{ padding:"96px 24px",background:bg }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64,...fadeIn("testimonials") }}>
            <div className="tag" style={{ marginBottom:14 }}>{t.testimonials.badge}</div>
            <h2 style={{ fontSize:"clamp(30px,3.8vw,52px)",fontWeight:800,fontFamily:"Space Grotesk",letterSpacing:"-1px" }}>{t.testimonials.h2}</h2>
          </div>
          <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22 }}>
            {t.testimonials.list.map((item,i) => (
              <div key={item.name} className="ch" style={{ background:card,border:`1px solid ${border}`,borderRadius:22,padding:28,transition:"all .4s",...fadeIn("testimonials",i*.1) }}>
                <div style={{ marginBottom:16 }}>{Array(item.rating).fill(0).map((_,j) => <span key={j} style={{ color:"#F59E0B",fontSize:15 }}>★</span>)}</div>
                <p style={{ color:muted,fontSize:14,lineHeight:1.85,marginBottom:22,fontStyle:"italic" }}>"{item.text}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:42,height:42,borderRadius:11,background:`linear-gradient(135deg,${avatarColors[i]},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17 }}>
                    {["👨‍💼","👩‍💼","👩‍💼"][i]}
                  </div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:14.5 }}>{item.name}</div>
                    <div style={{ color:muted,fontSize:12.5 }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─────────────────────────── */}
      <section id="contact" ref={setRef("contact")} style={{ padding:"96px 24px",background:bg2 }}>
        <div style={{ maxWidth:1280,margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"start" }}>
            <div style={{ ...fadeIn("contact") }}>
              <div className="tag" style={{ marginBottom:18 }}>{t.contact.badge}</div>
              <h2 style={{ fontSize:"clamp(28px,3.2vw,48px)",fontWeight:800,fontFamily:"Space Grotesk",letterSpacing:"-1px",marginBottom:18,lineHeight:1.2 }}>{t.contact.h2}</h2>
              <p style={{ color:muted,fontSize:15.5,lineHeight:1.85,marginBottom:36 }}>{t.contact.sub}</p>
              <div style={{ display:"flex",flexDirection:"column",gap:18,marginBottom:32 }}>
                {[["📧",t.contact.info[0]],["📞",t.contact.info[1]],["📍",t.contact.info[2]]].map(([icon,info]) => (
                  <div key={info} style={{ display:"flex",alignItems:"center",gap:14 }}>
                    <div style={{ width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0 }}>{icon}</div>
                    <span style={{ color:muted,fontSize:14.5 }}>{info}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                {["GitHub","LinkedIn","Dribbble","Behance"].map(s => (
                  <div key={s} style={{ padding:"7px 14px",background:card,border:`1px solid ${border}`,borderRadius:9,fontSize:13,fontWeight:600,color:muted,cursor:"pointer",transition:"all .25s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor=accent; e.currentTarget.style.color=accent; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor=border; e.currentTarget.style.color=muted; }}
                  >{s}</div>
                ))}
              </div>
            </div>

            <div style={{ background:card,border:`1px solid ${border}`,borderRadius:26,padding:36,...fadeIn("contact",.1) }}>
              {sent ? (
                <div style={{ textAlign:"center",padding:"44px 0" }}>
                  <div style={{ fontSize:60,marginBottom:18 }}>🎉</div>
                  <h3 style={{ fontSize:22,fontWeight:700,fontFamily:"Space Grotesk",lineHeight:1.4 }}>{t.contact.sent}</h3>
                </div>
              ) : (
                <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                  <div className="form-row" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                    <input value={formState.name} onChange={e => setFormState(s => ({...s,name:e.target.value}))} placeholder={t.contact.name} />
                    <input value={formState.email} onChange={e => setFormState(s => ({...s,email:e.target.value}))} placeholder={t.contact.email} type="email" />
                  </div>
                  <select value={formState.project} onChange={e => setFormState(s => ({...s,project:e.target.value}))}>
                    <option value="">{t.contact.project}</option>
                    <option>UI/UX Design</option>
                    <option>Website Design</option>
                    <option>Full-Stack Development</option>
                    <option>Maintenance & Support</option>
                  </select>
                  <textarea value={formState.msg} onChange={e => setFormState(s => ({...s,msg:e.target.value}))} placeholder={t.contact.msg} rows={5} style={{ resize:"none" }} />
                  <button className="btn-p" style={{ width:"100%",padding:"15px",fontSize:15.5,borderRadius:13 }} onClick={handleSend} disabled={sending}>
                    {sending ? `⏳ ${t.contact.sending}` : `${t.contact.send} ✦`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────── */}
      <footer style={{ background:bg,borderTop:`1px solid ${border}`,padding:"36px 24px" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:18 }}>
          <div style={{ display:"flex",alignItems:"center",gap:9 }}>
            <div style={{ width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${accent},${accent2})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ color:"#fff",fontWeight:800,fontSize:13 }}>W</span>
            </div>
            <span style={{ fontWeight:700,fontSize:15,fontFamily:"Space Grotesk" }}>WebCraft<span style={{ color:accent }}>Studio</span></span>
          </div>
          <div style={{ display:"flex",gap:22,flexWrap:"wrap",justifyContent:"center" }}>
            {Object.entries(t.nav).filter(([k]) => k!=="getQuote").map(([k,v]) => (
              <span key={k} style={{ fontSize:13,color:muted,cursor:"pointer",transition:"color .25s" }}
                onMouseOver={e => e.currentTarget.style.color=accent}
                onMouseOut={e => e.currentTarget.style.color=muted}
                onClick={() => scrollTo(k)}
              >{v}</span>
            ))}
          </div>
          <p style={{ color:muted,fontSize:12.5,textAlign:"center" }}>{t.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}
