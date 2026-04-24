# Everest Education - React + Tailwind CSS

موقع مؤسسة ايفرست التعليمية - مبني بـ React، TypeScript، و Tailwind CSS

## 🚀 التشغيل السريع

```bash
# تثبيت المكتبات
npm install

# التشغيل في بيئة التطوير
npm run dev

# البناء للإنتاج
npm run build
```

## 📁 هيكل المشروع

```
src/
├── components/          # المكونات الرئيسية
│   ├── ui/             # مكونات UI قابلة لإعادة الاستخدام
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Icon.tsx
│   │   ├── Image.tsx
│   │   └── SectionTitle.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Features.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Consultation.tsx
│   ├── Specialties.tsx
│   ├── Partners.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── constants/          # الثوابت والبيانات
│   ├── colors.ts      # ألوان الموقع
│   ├── data.ts        # بيانات المحتوى
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## ✨ المميزات

### 🎨 Best Practices المُطبقة

#### 1. **فصل المسؤوليات (Separation of Concerns)**
- ✅ البيانات منفصلة في `constants/data.ts`
- ✅ الألوان مركزية في `constants/colors.ts`
- ✅ المكونات مقسمة حسب الوظيفة

#### 2. **إعادة الاستخدام (Reusability)**
- ✅ مكونات UI قابلة لإعادة الاستخدام (`Button`, `Card`, `Container`, إلخ)
- ✅ كل مكون له props مرنة و variants متعددة
- ✅ Types محددة باستخدام TypeScript

#### 3. **الأداء (Performance)**
- ✅ **Lazy Loading** للصور (`loading="lazy"`)
- ✅ الصور أعلى الصفحة بدون lazy loading لسرعة FCP
- ✅ مكونات خفيفة بدون dependencies غير ضرورية

#### 4. **TypeScript**
- ✅ جميع المكونات typed بشكل صحيح
- ✅ Interfaces واضحة للبيانات
- ✅ Type safety كامل

#### 5. **Tailwind CSS**
- ✅ استخدام Utility Classes
- ✅ Tailwind v4 مع `@tailwindcss/vite`
- ✅ CSS Variables للألوان المخصصة

## 🧩 استخدام المكونات القابلة لإعادة الاستخدام

### Button Component

```tsx
import { Button } from './ui';

// كزر عادي
<Button variant="primary" size="lg">
  احصل على استشارة
</Button>

// كرابط
<Button as="a" href="#contact" variant="outline" icon="fas fa-arrow-left">
  تواصل معنا
</Button>

// مع أيقونة على اليسار
<Button variant="secondary" icon="fas fa-download" iconPosition="left">
  تحميل
</Button>
```

**Variants**: `primary` | `secondary` | `outline`  
**Sizes**: `sm` | `md` | `lg`

### Card Component

```tsx
import { Card } from './ui';

<Card padding="lg" hover={true}>
  <h3>عنوان البطاقة</h3>
  <p>محتوى البطاقة</p>
</Card>
```

**Padding**: `none` | `sm` | `md` | `lg`  
**Hover**: `true` | `false`

### Image Component

```tsx
import { Image } from './ui';

// مع lazy loading
<Image 
  src="image.jpg" 
  alt="وصف الصورة"
  lazy={true}
  aspectRatio="video"
/>
```

**Lazy**: `true` | `false`  
**AspectRatio**: `square` | `video` | `auto`

### Container Component

```tsx
import { Container } from './ui';

<Container size="lg">
  {/* المحتوى */}
</Container>
```

**Sizes**: `sm` | `md` | `lg` | `xl`

### Icon Component

```tsx
import { Icon } from './ui';

<Icon name="fas fa-check" size="lg" className="text-green-500" />
```

**Sizes**: `sm` | `md` | `lg` | `xl`

## 📊 البيانات

جميع البيانات موجودة في `src/constants/data.ts`:

```typescript
import { statsData, servicesData, faqData } from '../constants';

// استخدام البيانات في المكون
const Services = () => {
  return (
    <div>
      {servicesData.map((service) => (
        <div key={service.title}>{service.title}</div>
      ))}
    </div>
  );
};
```

## 🎨 الألوان

الألوان مركزية في `src/constants/colors.ts`:

```typescript
export const colors = {
  primary: '#0859BC',
  secondary: '#FF822E',
  darkNavy: '#203252',
  // ...
};
```

## 🔧 التحسينات المستقبلية

- [ ] إضافة React Query للبيانات من API
- [ ] تحسين SEO بـ React Helmet
- [ ] إضافة i18n للترجمة
- [ ] PWA Support
- [ ] Unit Tests
- [ ] Storybook للمكونات

## 📝 ملاحظات

- الموقع RTL للغة العربية
- responsive لجميع الشاشات
- استخدام Google Fonts (Tajawal, Montserrat)
- Font Awesome للأيقونات

---

**تصميم وتطوير**: YesTech  
**السنة**: 2025
