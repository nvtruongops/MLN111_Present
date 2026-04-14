import Link from 'next/link'

export const metadata = {
  title: 'Nội dung chi tiết — Phép biện chứng duy vật',
  description: 'Chi tiết về phép biện chứng duy vật, nguyên lý và quy luật cơ bản',
}

export default function ContentPage() {
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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)',
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
            Nội dung chi tiết chủ đề
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
            Phép biện chứng duy vật là gì?
            <br />
            Ví dụ và vai trò cụ thể
          </h1>
          <div style={{ width: '60px', height: '3px', background: '#0463ab', margin: '0 auto', borderRadius: '2px' }} />
        </div>

        {/* ── Content Body ─────────────────────────── */}
        <div
          className="mobile-page-box"
          style={{
            background: '#0463ab',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(4,99,171,0.3)',
            fontSize: '17px',
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 300,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{
            padding: '24px',
            background: 'rgba(255,255,255,0.1)',
            borderLeft: '4px solid rgba(255,255,255,0.6)',
            borderRadius: '0 8px 8px 0',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '16px'
          }}>
            <p>Nguồn tham khảo nội dung học thuật từ <b>Thư Viện Pháp Luật</b>: Các khái niệm, định nghĩa và ví dụ về phép biện chứng duy vật trong triết học Mác - Lênin.</p>
          </div>

          <div style={{ margin: '16px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            <img src="/image/phep-bien-chung.jpg" alt="Phép biện chứng duy vật" style={{ width: '100%', display: 'block' }} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '16px', marginBottom: '8px' }}>
            1. Khái niệm cơ bản
          </h2>
          <p>
            Phép biện chứng duy vật là một bộ phận cơ bản trong hệ thống triết học của chủ nghĩa Mác - Lênin, kết hợp giữa phép biện chứng và chủ nghĩa duy vật. Theo cách hiểu của các nhà kinh điển của chủ nghĩa Mác - Lênin, đây là một học thuyết rộng lớn và sâu sắc về sự phát triển và mối liên hệ giữa các sự vật, hiện tượng trong thế giới.
          </p>
          <p>
            Ph.Ăngghen định nghĩa phép biện chứng là <b>"khoa học về sự liên hệ phổ biến"</b>. Cụm từ "liên hệ phổ biến" nhấn mạnh đến quan điểm rằng mọi sự vật, hiện tượng trong tự nhiên, xã hội và tư duy không tồn tại độc lập, mà luôn có sự liên hệ và ảnh hưởng qua lại lẫn nhau.
          </p>
          <p>
            V.I.Lênin nhấn mạnh nguyên lý về sự phát triển: "Trong số những thành quả đó thì thành quả chủ yếu là phép biện chứng, tức là học thuyết về sự phát triển, dưới hình thức hoàn bị nhất, sâu sắc nhất và không phiến diện..."
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '32px', marginBottom: '8px' }}>
            2. Hai nguyên lý cơ bản & Ba quy luật
          </h2>
          <p>
            Trong hệ thống triết học Mác - Lênin, phép biện chứng duy vật là công cụ nhận thức khoa học, giúp con người hiểu rõ về sự phát triển của sự vật hiện tượng.
          </p>
          <p>
            <b>Hai nguyên lý cơ bản:</b> Nguyên lý về mối liên hệ phổ biến và nguyên lý về sự phát triển.
          </p>
          <p><b>Ba quy luật cơ bản:</b></p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <b>Quy luật chuyển hóa từ sự thay đổi về lượng thành thay đổi về chất và ngược lại:</b> Sự thay đổi dần dần về lượng có thể dẫn đến bước nhảy vọt về chất.
            </li>
            <li>
              <b>Quy luật thống nhất và đấu tranh giữa các mặt đối lập:</b> Mọi sự vật đều chứa đựng các yếu tố đối lập, sự đấu tranh giữa chúng là nguồn gốc của sự phát triển.
            </li>
            <li>
              <b>Quy luật phủ định của phủ định:</b> Quá trình phát triển không phải là tuyến tính mà là một chuỗi phủ định và khẳng định liên tiếp, tạo ra sự vận động theo hình xoáy ốc.
            </li>
          </ul>

          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '32px', marginBottom: '8px' }}>
            3. Vai trò của phép biện chứng duy vật
          </h2>
          <p>
            Phép biện chứng duy vật đóng vai trò là một nội dung đặc biệt quan trọng trong thế giới quan và phương pháp luận triết học Mác - Lênin, đồng thời cũng là nền tảng chung nhất của hoạt động sáng tạo trong các lĩnh vực nghiên cứu khoa học.
          </p>
          <p>
            Sự phát triển của triết học, đặc biệt là chủ nghĩa duy vật, đã đem đến một sự chuyển biến quan trọng trong tư duy của con người, giúp giải thích các hiện tượng tự nhiên và xã hội một cách khoa học, khách quan thay thế những góc nhìn tâm linh và thần thánh.
          </p>

          <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '32px', marginBottom: '8px' }}>
            4. Ví dụ thực tiễn
          </h2>
          <div style={{ background: '#12b24f', padding: '24px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Về quy luật "phủ định của phủ định"</h3>
            <p style={{ margin: 0 }}>
              Một con gà mái được coi là cái khẳng định, khi con gà mái đó đẻ trứng thì quả trứng đó sẽ được coi là cái phủ định của con gà. Quả trứng trải qua vận động, phát triển và nở ra con gà con. Con gà con lúc này là cái phủ định của phủ định, trở thành cái khẳng định ở một chu kỳ mới.
            </p>
          </div>
          
          <div style={{ background: '#12b24f', padding: '24px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Về quy luật Lượng - Chất</h3>
            <p style={{ margin: 0 }}>
              Một quãng đường đi làm về nhà dài 5km. Sự chuyển động trên quãng đường này liên tục là sự tích lũy dần về lượng. Đến khi bạn chính thức về đến nhà, thì đó là lúc thay đổi sự vật về mặt chất (kết thúc di chuyển, chuyển trạng thái). Sự thay đổi về lượng cuối cùng dẫn đến sự thay đổi về chất.
            </p>
          </div>
          
          <div style={{ background: '#12b24f', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Về quy luật Thống nhất & Đấu tranh (Mâu thuẫn)</h3>
            <p style={{ margin: 0 }}>
              Ví dụ về nam châm vĩnh cửu: Một thanh nam châm luôn tồn tại hai cực Bắc và Nam. Hai mặt này đối lập, bài trừ nhau nhưng lại gắn liền, liên hệ mật thiết (thống nhất) không thể tách rời trong một thực thể. Sự thống nhất và đấu tranh giữa hai cực từ đó mới tạo nên từ trường và đặc tính hút/đẩy của nam châm. Sự đấu tranh là động lực của vạn vật.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
