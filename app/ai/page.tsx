import Link from 'next/link'

export const metadata = {
  title: 'AI Usage — Vòng Xoáy Biện Chứng',
  description: 'Mục tiêu và chi tiết quá trình sử dụng trí tuệ nhân tạo trong việc phát triển dự án MLN111',
}

export default function AiUsagePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#e96d23',
        color: '#000',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      {/* ── Background decoration ──────────────────── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 40% 30%, rgba(200,50,200,0.06) 0%, transparent 60%)',
        }}
      />

      <div
        className="mobile-page-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* ── Header ───────────────────────────────── */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.6)',
              marginBottom: '16px',
              fontWeight: 700,
            }}
          >
            Công nghệ & Hỗ trợ
          </div>
          <h1
            className="mobile-page-title"
            style={{
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '24px',
              color: '#0463ab',
              textShadow: '0 2px 10px rgba(4,99,171,0.2)',
            }}
          >
            AI Usage Documentation
          </h1>
          <div style={{ width: '60px', height: '3px', background: '#0463ab', margin: '0 auto', borderRadius: '2px' }} />
        </div>

        {/* ── Details ─────────────────────────── */}
        <div
          className="mobile-page-box"
          style={{
            background: '#0463ab',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(4,99,171,0.3)',
            lineHeight: 1.8,
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 300,
          }}
        >
          <p style={{ marginBottom: '24px', fontSize: '18px' }}>
            <b>Mục tiêu sử dụng trí tuệ nhân tạo (AI):</b> Dự án sử dụng AI để hỗ trợ phát triển các tính năng và mang lại trải nghiệm tương tác tốt nhất cho người dùng trong quá trình khám phá Triết học Mác - Lênin.
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li>
              <b>Nội dung & Hình ảnh trực quan:</b> Tạo hình ảnh minh họa bằng AI (Text-to-Image) cho trải nghiệm cuộn trang trực quan (Scroll-based storytelling) với các luồng ánh sáng và không gian vũ trụ mang tính triết học cao.
            </li>
            <li>
              <b>Lập trình & Kỹ thuật:</b> Hỗ trợ lập trình tự động với NextJS, thiết lập môi trường, và kiểm thử hiệu suất mượt mà cho trải nghiệm cuộn 3D mô phỏng của trang web mà không tiêu hao nhiều tài nguyên cấu hình.
            </li>
            <li>
              <b>Tư liệu học thuật:</b> Tham vấn trí tuệ nhân tạo trong định hướng hệ thống thông tin, trau dồi và tham khảo nội dung các triết lý Mác - Lênin để đưa vào sản phẩm học thuật một cách chuẩn xác từ các thư viện và nguồn học thuật uy tín dành cho môn MLN111.
            </li>
          </ul>
          <div style={{
            padding: '24px',
            background: '#12b24f',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            fontStyle: 'italic',
            color: '#fff',
            marginTop: '32px'
          }}>
            <p style={{ margin: 0, fontWeight: 500 }}>
              Việc áp dụng công nghệ AI vào quá trình trên hoàn toàn tuân thủ tính minh bạch, với mục đích lớn nhất là hỗ trợ tối đa việc tái hiện những mảng kiến thức triết học bao quát dưới hình thức dễ tiếp cận nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
