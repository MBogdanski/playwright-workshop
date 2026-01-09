# Playwright - Cheat Sheet 🎭

**Szybka referencja dla szkolenia Sauce Demo. Ctrl+F aby znaleźć co trzeba! 🔍**

---

## Selektory - Locators API

**Staraj się unikać selektorów Xpath** Użyj tych metod:

```typescript
// Po tekście przycisku/linku - NAJCZĘŚCIEJ UŻYWANE
page.getByRole('button', { name: 'Login' })
page.getByRole('link', { name: 'Products' })

// Po placeholder'ie input'a
page.getByPlaceholder('Username')
page.getByPlaceholder('Password')

// Po tekście label'a (checkbox, radio)
page.getByLabel('Remember me')

// Po atrybucie data-testid
page.locator('[data-testid="product-item"]')

// Po głównym tekście
page.getByText('Add to Cart')
```

**Znalazłeś element? Teraz możesz go przeiterować:**
```typescript
const items = page.locator('[data-testid="product"]');
const count = await items.count(); // ile ich jest
const first = items.first(); // pierwszy
const nth = items.nth(2); // trzeci (0-indexed)
```

---

## Odczytywanie wartości z elementów

```typescript
// Czysty tekst z elementu (używaj to!)
await element.innerText(); // "Click me"

// Wartość z input'a
await emailInput.inputValue(); // "user@example.com"

// Atrybut HTML
await link.getAttribute('href'); // "/checkout"
await element.getAttribute('data-testid');

// Stan elementu
await button.isEnabled(); // czy klikać można?
await checkbox.isChecked(); // czy zaznaczony?
await element.isVisible(); // czy widać go?
```

---

## Czekanie na elementy (Playwright czeka za Ciebie!)

```typescript
// Nie musisz nic robić - Playwright czeka automatycznie
await button.click(); // czeka aż będzie widoczny i klikalny

// Ale jeśli element się pojawia/znika, czekaj jawnie:
await element.waitFor({ state: 'visible' }); // aż się pojawi
await spinner.waitFor({ state: 'hidden' }); // aż zniknie
```

---

## Interakcje z elementami

```typescript
// Klikanie
await button.click();

// Wpisywanie tekstu do input'a
await input.fill('text'); // czyszcze i wpisuje
await input.type('text', { delay: 50 }); // charakter po charakterze

// Zaznaczanie/odklejanie
await checkbox.check(); // zaznacz
await checkbox.uncheck(); // odklejaj

// Select/dropdown
await select.selectOption('value');
await select.selectOption({ label: 'Text' });

// Scroll do elementu (jeśli poza ekranem)
await element.scrollIntoViewIfNeeded();
```

---

## Asercje - Sprawdzanie czy coś się stało

```typescript
import { expect } from '@playwright/test';

// Czekanie na warunki (Playwright czeka automatycznie!)
await expect(button).toBeVisible(); // czeka aż się pojawi
await expect(button).toBeEnabled(); // czeka aż będzie klikalne
await expect(message).toContainText('Success'); // czeka na tekst

// Dokładne wartości
await expect(heading).toHaveText('Welcome!'); // dokładnie ten tekst
await expect(input).toHaveValue('user@email.com');
await expect(link).toHaveAttribute('href', '/checkout');

// Stany
await expect(checkbox).toBeChecked();
await expect(checkbox).not.toBeChecked();

// Liczenie
await expect(page.locator('.product')).toHaveCount(5); // ile jest produktów
```

---

## Powiększanie na liście produktów

```typescript
// Policz wszystkie produkty na stronie
const products = page.locator('[data-testid="product"]');
const count = await products.count();

// Iteruj po każdym
for (let i = 0; i < count; i++) {
  const productName = await products.nth(i).innerText();
  console.log(productName);
}
```

---

## Nawigacja

```typescript
// Przejdź na stronę
await page.goto('https://www.saucedemo.com/');

// Aktualny URL
const currentUrl = page.url();

// Czekaj aż URL się zmieni (po redirect'cie)
await page.waitForURL('**/inventory');
```

---

## Debug - Kiedy coś nie działa

```typescript
// Zatrzymaj test i otwórz debugger
await page.pause();

// Wydruk do konsoli
console.log('URL:', page.url());
console.log('Tekst:', await element.innerText());

// Zrób screenshota
await page.screenshot({ path: 'debug.png' });
```

**Polecenia w terminalu dla debugowania:**
```bash
# Interaktywny UI do oglądania testów krok po kroku
npx playwright test --ui

# Przegląd raportu HTML
npx playwright show-report

# Debug konkretnego testu
npx playwright test --debug tests/unfinished/sauce-demo-login.spec.ts
```

---

## ⚠️ Najczęstsze błędy

| ❌ Źle | ✅ Dobrze |
|--------|----------|
| `await page.waitForTimeout(5000)` | `await element.waitFor({ state: 'visible' })` |
| Selector XPath: `//*[@id="app"]/div...` | `page.getByRole('button', { name: 'Login' })` |
| Kliknięcie bez asercji | Zawsze dodaj `expect()` po akcji |
| Test zależy od danych z poprzedniego | Każdy test musi być **niezależny** |

---

## Page Objects - Struktura dla Sauce Demo

```typescript
// pages/saucedemo-login-page.ts
export class SaucedemoLoginPage {
  constructor(private page: Page) {}
  
  // Selektory jako gettery
  get usernameInput() { 
    return this.page.getByPlaceholder('Username'); 
  }
  get passwordInput() { 
    return this.page.getByPlaceholder('Password'); 
  }
  get loginButton() { 
    return this.page.getByRole('button', { name: 'Login' });
  }
  
  // Akcje
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }
  
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

💡 **Główna zasada:** Zawsze czekaj na **warunki**, nie na **czas**!

🎯 **Cel:** Test powinien mówić CO się stało, nie JAK się stało.
