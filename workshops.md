# Playwright Workshop - Szkolenie Automatyzacji Testów

## 📋 Spis Treści
- [Uruchomienie Projektu](#uruchomienie-projektu)
- [Dostępne Skrypty](#dostępne-skrypty)
- [Pierwsze Uruchomienie](#pierwsze-uruchomienie)
- [Agenda Szkolenia](#agenda-szkolenia)

---

## 🚀 Uruchomienie Projektu

### Wymagania
- **Node.js** v22+ 
- **npm** v9+

### Instalacja Zależności
```bash
npm install
```

Polecenie instaluje wszystkie wymagane pakiety, w tym:
- `@playwright/test` - framework testowy
- `typescript` - TypeScript compiler
- `prettier` - formatter kodu
- `@faker-js/faker` - generator danych testowych

---

## 📦 Dostępne Skrypty

| Skrypt | Polecenie | Opis |
|--------|-----------|------|
| **Linting** | `npm run lint` | Sprawdza typy TypeScript i formatowanie kodu |

### Uruchomienie Testów Playwright

```bash
# Uruchom wszystkie testy
npx playwright test

# Uruchom testy w trybie UI (interaktywny)
npx playwright test --ui

# Uruchom testy z wyświetlaniem przeglądarki
npx playwright test --headed

# Uruchom konkretny plik testowy
npx playwright test tests/sauce-demo-login.spec.ts

# Uruchom testy z debuggerem
npx playwright test --debug

# Obejrzyj raport HTML
npx playwright show-report
```

---

## 🔧 Pierwsze Uruchomienie

### Krok 1: Zainstaluj Zależności
```bash
npm install
```

### Krok 2: Zainstaluj Przeglądarki Playwright
```bash
npx playwright install
```

### Krok 3: Uruchom Pierwsze Testy
```bash
npx playwright test
```

### Krok 4: Sprawdź Raport
```bash
npx playwright show-report
```

Wszystkie testy powinny się uruchomić bez błędów. Raport HTML będzie dostępny w katalogu `playwright-report/`.

---

## 📚 Agenda Szkolenia

### 1. **Page Object Model (POM) - Fundacja Automatyzacji**
   - **Cel:** Nauczyć się Best Practices w organizacji testów
   - **Praktyka:** 
     - Crear reusable Page Objects dla strony https://www.saucedemo.com/
     - Separacja logiki strony od logiki testów
     - Zarządzanie selektorami i akcjami na stronie
   - **Rezultat:** Klasy `SaucedemoLoginPage` i dalsze Page Objects dla całej strony

### 2. **Grupowanie Testów i Organizacja Struktur**
   - **Cel:** Pisać czytelne i łatwe w utrzymaniu testy
   - **Praktyka:**
     - Używanie `describe()` do grupowania powiązanych testów
     - Organizacja testów w logiczne zestawy (login, produkty, checkout, itd.)
     - Struktura katalogów: jeden test = jeden scenariusz
   - **Przykład:**
     ```typescript
     test.describe('Sauce Demo - Login Page', () => {
       test.describe('Valid Credentials', () => {
         test('should login with standard user', async () => { })
       })
       test.describe('Invalid Credentials', () => {
         test('should show error message', async () => { })
       })
     })
     ```

### 3. **Hooki Before/After - Wspólna Konfiguracja**
   - **Cel:** Automatyzować powtarzalne akcje przed i po testach
   - **Praktyka:**
     - `test.beforeEach()` - konfiguracja przed każdym testem (nawigacja, login)
     - `test.afterEach()` - czyszczenie po testach (logout, czy screenshot błędu)
     - `test.beforeAll()` - jednorazowa konfiguracja dla całej grupy
     - `test.afterAll()` - jednorazowe czyszczenie po wszystkich testach
   - **Przykład:**
     ```typescript
     test.beforeEach(async ({ page }) => {
       const loginPage = new SaucedemoLoginPage(page)
       await loginPage.navigate()
     })
     ```

### 4. **Playwright Codegen - Generowanie Testów**
   - **Cel:** Przyspieszyć tworzenie testów i zrozumieć działanie aplikacji
   - **Praktyka:**
     - Automatyczne nagrywanie akcji użytkownika
     - Generowanie selektorów i działań
     - Edycja wygenerowanego kodu
     - Integracja z Page Objects
   - **Polecenie:**
     ```bash
     npx playwright codegen https://www.saucedemo.com/
     ```
   - **Workflow:**
     1. Otwiera się przeglądarka + okno nagrywania
     2. Wykonujesz akcje w aplikacji (klikanie, wpisywanie)
     3. Codegen automatycznie generuje kod testowy
     4. Skopiuj wygenerowany kod do testów
     5. Zrefaktoruj do Page Objects

---

## 📁 Struktura Projektu

```
playwright-workshop/
├── pages/                    # Page Objects
│   ├── saucedemo-login-page.ts
│   ├── saucedemo-products-page.ts
│   ├── saucedemo-cart-page.ts
│   ├── saucedemo-checkout-your-information-page.ts
│   ├── saucedemo-checkout-overview-page.ts
│   └── saucedemo-checkout-complete-page.ts
├── tests/                    # Testy Playwright
│   ├── unfinished/          # Testy do uzupełnienia przez kursantów
│   │   ├── sauce-demo-login.spec.ts
│   │   ├── sauce-demo-products.spec.ts
│   │   ├── sauce-demo-cart.spec.ts
│   │   ├── sauce-demo-checkout-information.spec.ts
│   │   ├── sauce-demo-checkout-overview.spec.ts
│   │   └── sauce-demo-checkout-complete.spec.ts
│   └── finished/            # Testy w pełni zaimplementowane (do porównania)
│       ├── sauce-demo-login.spec.ts
│       ├── sauce-demo-products.spec.ts
│       ├── sauce-demo-cart.spec.ts
│       ├── sauce-demo-checkout-information.spec.ts
│       ├── sauce-demo-checkout-overview.spec.ts
│       └── sauce-demo-checkout-complete.spec.ts
├── playwright-report/        # Raporty HTML (generowane)
├── test-results/            # Wyniki testów (generowane)
├── playwright.config.ts     # Konfiguracja Playwright
├── tsconfig.json           # Konfiguracja TypeScript
├── package.json            # Zależności projektu
└── workshops.md            # Ten plik
```

### 🎓 Katalogi Testów

- **`tests/unfinished/`** - Testy do uzupełnienia przez kursantów:
  - Każdy test jest na jednym z trzech poziomów zaawansowania
  - Poziom 1: Najpełniejszy test, brakuje tylko ostatniej asercji
  - Poziom 2: Brakuje akcji i asercji
  - Poziom 3: Cały test do zaimplementowania
  
- **`tests/finished/`** - Testy w pełni zaimplementowane:
  - Gotowe rozwiązania do porównania
  - Mogą być użyte jako referencyjna implementacja
  - Przydatne gdy kursant utknął lub chce sprawdzić swoje rozwiązanie

---

## 💡 Porady i Best Practices

- **Selektory:** Preferuj `getByRole()` i `getByPlaceholder()` zamiast CSS/XPath
- **Waits:** Playwright czeka automatycznie na elementy (nie musisz pisać `sleep()`)
- **Screenshots:** Dodaj screenshoty do raportów w momencie błędu
- **Parallel Execution:** Testy mogą się wykonywać równolegle - pamiętaj o izolacji danych

---

## 🔗 Przydatne Linki

- [Dokumentacja Playwright](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Saucedemo - Strona Testowa](https://www.saucedemo.com/)

---

## ❓ Pytania?

W razie pytań dotyczących projektu lub szkolenia, sprawdź dokumentację lub zdobyte materiały.

Happy Testing! 🎭✨
