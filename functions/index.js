export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // گرفتن پارامتر پروژه (مثال: ?p=7824093128-1718465123)
  const project = url.searchParams.get('p'); 
  
  if (project) {
    try {
      // تفکیک آیدی کاربر و آیدی پروژه از روی خط تیره
      const [chatId, projectId] = project.split('-');
      
      if (!chatId || !projectId) {
        return new Response('فرمت لینک معتبر نیست.', { status: 400 });
      }
      
      // فراخوانی مستقیم فایل از آدرس گیت‌هاب پیجز
      const targetUrl = `https://mohamadmahdimahdi2101-glitch.github.io/website-bot/${chatId}/${projectId}/index.html`;
      
      const response = await fetch(targetUrl);
      
      if (response.status === 404) {
        return new Response('⚠️ متأسفانه این سایت یا پروژه یافت نشد.', { 
          status: 404, 
          headers: { 'content-type': 'text/html; charset=utf-8' } 
        });
      }
      
      return new Response(response.body, {
        headers: { 'content-type': 'text/html; charset=utf-8' }
      });
      
    } catch (error) {
      return new Response('خطایی در سرور رخ داد.', { status: 500 });
    }
  }
  
  return new Response('<h1>به سیستم وب‌ساز هوشمند خوش آمدید</h1>', {
    headers: { 'content-type': 'text/html; charset=utf-8' }
  });
}
