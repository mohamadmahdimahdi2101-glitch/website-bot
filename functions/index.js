export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname; // مسیر را جدا می‌کند، مثلاً: /7824093128/1781537814529/

    // اگر کاربر فقط آدرس اصلی را باز کرد و هیچ ساب‌فولدری نزد
    if (path === "/" || path === "") {
      return new Response("دستگاه ساخت سایت فعال است و منتظر درخواست‌هاست.", {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // ساخت آدرس مستقیم نسخه Raw از گیت‌هاب شما
    const githubRawUrl = `https://raw.githubusercontent.com/mohamadmahdimahdi2101-glitch/website-bot/main${path}index.html`;

    try {
      // درخواست به گیت‌هاب برای گرفتن کد HTML
      const githubResponse = await fetch(githubRawUrl);
      
      if (githubResponse.ok) {
        const htmlContent = await githubResponse.text();
        // تحویل دادن کد HTML به مرورگر کاربر
        return new Response(htmlContent, {
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      } else {
        return new Response("سایت مورد نظر پیدا نشد. مطمئن شوید آدرس را درست وارد کرده‌اید.", { 
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
    } catch (error) {
      return new Response("خطا در ارتباط با سرور گیت‌هاب.", { 
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
  }
};
