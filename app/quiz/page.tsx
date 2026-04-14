import Link from 'next/link'

export const metadata = {
  title: 'Quiz Biện Chứng',
  description: 'Trang quiz tổng hợp về phép biện chứng duy vật',
}

export default function QuizPage() {
  return (
    <div
      className="mobile-page-wrapper"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 20%, #1d2433 0%, #090b0f 55%, #000 100%)',
        color: '#fff',
        paddingTop: '110px',
        paddingBottom: '90px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '42px' }}>
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '12px',
            }}
          >
            Con đường Biện chứng
          </p>
          <h1
            className="mobile-page-title"
            style={{
              fontSize: '42px',
              lineHeight: 1.2,
              marginBottom: '18px',
            }}
          >
            Quiz tự đánh giá
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', lineHeight: 1.7 }}>
            Kiểm tra nhanh mức độ nắm vững: Nguyên lý về sự phát triển,
            ba quy luật và liên hệ thực tiễn.
          </p>
        </div>

        <section
          className="mobile-page-box"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '18px',
            padding: '30px',
            marginBottom: '24px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '14px' }}>Gợi ý bộ câu hỏi</h2>
          <ol style={{ paddingLeft: '20px', lineHeight: 1.9, color: 'rgba(255,255,255,0.88)' }}>
            <li>Vì sao vận động được coi là phương thức tồn tại của vật chất?</li>
            <li>Nếu một hệ thống đạt đến điểm nút, điều gì xảy ra với chất của nó?</li>
            <li>Phủ định của phủ định khác gì với sự lặp lại đơn thuần?</li>
            <li>Hãy nêu một ví dụ mâu thuẫn trong lĩnh vực cyber security.</li>
            <li>AI hiện nay phản ánh quy luật biện chứng nào rõ nhất? Vì sao?</li>
          </ol>
        </section>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              padding: '12px 20px',
              borderRadius: '999px',
              textDecoration: 'none',
              background: '#fff',
              color: '#000',
              fontWeight: 600,
            }}
          >
            Quay lại trang trình chiếu
          </Link>
          <Link
            href="/content"
            style={{
              padding: '12px 20px',
              borderRadius: '999px',
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              fontWeight: 500,
            }}
          >
            Xem nội dung chi tiết
          </Link>
        </div>
      </div>
    </div>
  )
}
