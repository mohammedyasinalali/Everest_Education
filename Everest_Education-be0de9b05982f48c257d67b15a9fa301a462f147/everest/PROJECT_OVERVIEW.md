
# 🏔️ Everest Education - توثيق المشروع التقني

## 1️⃣ نظرة عامة على المشروع (Project Overview)

*   **الهدف**: منصة إلكترونية للطلاب الدوليين (خصوصاً العرب) الراغبين بالدراسة في الجامعات التركية الخاصة. توفر معلومات عن التخصصات، الجامعات، والخدمات اللوجستية.
*   **الفئة المستهدفة**: الطلاب وأولياء الأمور الباحثين عن فرص دراسية في تركيا.
*   **نوع الموقع**: موقع تعريفي (Landing Page + Informational) مع إمكانية التواصل المباشر (Lead Generation) عبر واتساب ونماذج اتصال.

---

## 2️⃣ التقنيات المستخدمة (Tech Stack)

*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/) (لسرعة التطوير والأداء العالي).
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (لضمان نوع البيانات وتقليل الأخطاء).
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/) (أحدث إصدار، يدعم الـ JIT compiler تلقائياً ولا يحتاج لملف config معقد).
*   **Routing**: [React Router DOM v7](https://reactrouter.com/) (للتنقل بين الصفحات).
*   **Internationalization (i18n)**: `react-i18next` & `i18next` (دعم متعدد اللغات: العربية، الإنجليزية، الفارسية، الروسية).
*   **Animations**: CSS Native Animations + Swiper.js (للسلايدر في Home).
*   **SEO**: `react-helmet-async` (لإدارة meta tags ديناميكياً).

---

## 3️⃣ هيكل المشروع (Project Structure)

المشروع يتبع هيكلية معيارية لـ React:

*   📂 **`src/pages`**: تحتوي على المكونات الرئيسية التي تمثل صفحات كاملة (مثل `Home.tsx`, `AboutUs.tsx`).
*   📂 **`src/components`**: مكونات قابلة لإعادة الاستخدام.
    *   📂 **`ui`**: مكونات واجهة أساسية مثل زر (`Button`), حاوية (`Container`).
    *   `SEO.tsx`, `Header.tsx`, `Footer.tsx`.
*   📂 **`src/constants`**: **(مهم جداً)** هنا توجد البيانات الثابتة. بدلاً من قاعدة بيانات، نستخدم ملفات TS لتخزين البيانات.
    *   `specialties.ts`: بيانات التخصصات (الصور، الوصف، الأيقونات).
    *   `data.ts`: روابط القائمة، الإحصائيات، بيانات الخدمات.
*   📂 **`src/locales`**: ملفات الترجمة JSON (مثل `ar/translation.json`, `en/translation.json`).
*   📂 **`src/types`**: تعريفات الـ TypeScript Interfaces (اختياري، حالياً المعظم معرف ضمن الملفات).

---

## 4️⃣ نظام الصفحات (Page System)

يتم إدارة التوجيه في `App.tsx` باستخدام `react-router-dom`:

1.  **`Home.tsx` (`/`)**: الصفحة الرئيسية، تحتوي على Hero, Stats, Features, Services Preview.
2.  **`AboutUs.tsx` (`/about`)**: صفحة "من نحن"، الرؤية، الرسالة، والفريق.
3.  **`Services.tsx` (`/services`)**: صفحة الخدمات التفصيلية والباقات.
4.  **`TopSpecialties.tsx` (`/specialties`)**: صفحة تعرض قائمة التخصصات مع فلتر (طبية، هندسية، ...).
5.  **`SpecialtyDetail.tsx` (`/specialties/:id`)**: **(صفحة ديناميكية)**.
    *   تعتمد على `useParams()` لجلب الـ `id` من الرابط.
    *   تبحث في ملف `constants/specialties.ts` عن التخصص المطابق وتعرض بياناته.

---

## 5️⃣ نظام الـ SEO الحالي

تم بناء نظام SEO مرن باستخدام `react-helmet-async`:

*   **المكون الأساسي**: `src/components/SEO.tsx`.
    *   يستقبل `title`, `description`, `keywords`, `image`.
    *   يقوم بإنشاء وسوم `<title>` و `<meta>` تلقائياً.
    *   يدعم **Open Graph** (للمشاركة على فيسبوك/واتساب) و **Twitter Cards**.
*   **إدارة الحالة**: تم تغليف التطبيق بـ `<HelmetProvider>` في `main.tsx`.
*   **الديناميكية**: في صفحة التخصصات (`SpecialtyDetail`)، نمرر اسم التخصص وصورته للمكون `SEO`، مما يجعل كل صفحة فريدة لمحركات البحث.

---

## 6️⃣ نظام الترجمة (i18n)

*   **المكتبة**: `i18next`.
*   **التهيئة**: `src/i18n.ts`. يكتشف لغة المتصفح ويحمل ملف الترجمة المناسب.
*   **الملفات**:
    *   `src/locales/ar/translation.json`: النصوص العربية.
    *   `src/locales/en/translation.json`: النصوص الإنجليزية.
*   **الاستخدام**: نستخدم الـ hook `useTranslation()`:
    ```tsx
    const { t } = useTranslation();
    <h1>{t('header.title')}</h1>
    ```
*   **تغيير اللغة**: يتم عبر `Header.tsx`، ويقوم بتغيير اتجاه الصفحة (`dir="rtl"`) تلقائياً.

---

## 7️⃣ مصدر البيانات (Data Source)

*   **الحالة الحالية**: لا يوجد Backend (Serverless / Static).
*   **التخزين**: البيانات مخزنة في ملفات TypeScript (`constants/specialties.ts`).
    *   **الميزة**: سرعة هائلة في التحميل (Zero latency)، استضافة مجانية، أمان عالي.
    *   **العيوب**: تحديث البيانات يتطلب تعديل الكود وعمل Deploy جديد.

---

## 8️⃣ طريقة التشغيل والنشر (Build & Deploy)

*   **التطوير المحلي**:
    ```bash
    npm run dev
    ```
    يعمل على المنفذ `5173`.
*   **بناء النسخة النهائية (Production)**:
    ```bash
    npm run build
    ```
    يولد مجلد `dist` يحتوي على ملفات HTML/CSS/JS مضغوطة جاهزة للنشر.
*   **النشر**: يمكن رفع مجلد `dist` على أي استضافة (Netlify, Vercel, Hostinger). ينصح بـ Vercel لدعمه الممتاز لـ Vite وتوجيه SPA.

---

## 9️⃣ أشياء قيد التطوير (Future Plans)

1.  **لوحة تحكم (Admin Panel)**: للسماح للموظفين بإضافة تخصصات جديدة دون الرجوع للمبرمج (يتطلب ربط مع Firebase أو Supabase).
2.  **المدونة (Blog)**: نظام مقالات متكامل لجذب الزوار عبر SEO.
3.  **تحليلات متقدمة**: ربط Google Analytics 4 بشكل أعمق لتتبع النقرات على "تواصل معنا".

---

## 🔟 ملاحظات تقنية مهمة

1.  **تحميل الصور (Image Loading)**: واجهنا مشاكل سابقاً مع صور Unsplash بسبب سياسات الإحالة (Referrer Policy). تم حلها بإضافة `referrerPolicy="no-referrer"` لجميع الصور، وينصح مستقبلاً بتحميل الصور محلياً في مجلد `public/images` لضمان عدم توقفها.
2.  **Tailwind Class Sorting**: المشروع لا يستخدم أداة لترتيب كلاسات Tailwind، يفضل الالتزام بنسق معين (Layout -> Spacing -> Typography -> Visuals).
3.  **الأداء (Performance)**: الصور الحالية خارجية، لزيادة سرعة [LCP] يفضل تحويلها لنسق WebP واستضافتها محلياً.
