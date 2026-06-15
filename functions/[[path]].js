export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname; // گرفتن مسیر مثل: /7824093128/1781537814529/

    // اگر کاربر صفحه اصلی را باز کرد
    if (path === "/" || path === "") {
      return new Response("دستگاه ساخت سایت فعال است.", {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // ساخت لینک مستقیم نسخه راو گیت‌هاب برای فایل ایندکس کاربر
    const githubRawUrl = `https://raw.githubusercontent.com/mohamadmahdimahdi2101-glitch/website-bot/main${path}index.html`;

    try {
      const githubResponse = await fetch(githubRawUrl);
      
      if (githubResponse.ok) {
        const htmlContent = await githubResponse.text();
        // فرستادن کد به مرورگر با هدر HTML
        return new Response(htmlContent, {
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      } else {
        return new Response("سایت مورد نظر یافت نشد. مطمئن شوید لینک درست است.", { 
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
    } catch (error) {
      return new Response("خطا در ارتباط با گیت‌هاب.", { 
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }
  }
};
