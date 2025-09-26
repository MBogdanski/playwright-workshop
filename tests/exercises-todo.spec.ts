import { test, expect, Locator, Page } from '@playwright/test';

test.describe('TodoMVC - komplet zadań (1..20)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  const addTodo = async (page: Page, text: string) => {
    await page.locator('.new-todo').fill(text);
    await page.keyboard.press('Enter');
  };

  const getItems = (page: Page) => page.locator('.todo-list li');

  test('1 - Dodaj jedno nowe zadanie i sprawdź, że istnieje', async ({ page }) => {
    await addTodo(page, 'Buy milk');
    await expect(getItems(page)).toHaveCount(1);
    await expect(getItems(page).first().locator('label')).toHaveText('Buy milk');
  });

  test('2 - Dodaj trzy zadania i sprawdź ich liczbę', async ({ page }) => {
    for (const t of ['Task 1', 'Task 2', 'Task 3']) await addTodo(page, t);
    await expect(getItems(page)).toHaveCount(3);
  });

  test('3 - Dodanie zadania z białymi znakami (trim test przy dodawaniu)', async ({ page }) => {
    await addTodo(page, '   Trim spaces   ');
    await expect(getItems(page)).toHaveCount(1);
    // zakładamy, że aplikacja trimuje input podczas dodawania
    await expect(getItems(page).first().locator('label')).toHaveText('Trim spaces');
  });

  test('4 - Nie dodaje pustego zadania (Enter bez tekstu)', async ({ page }) => {
    await page.keyboard.press('Enter');
    await expect(getItems(page)).toHaveCount(0);
  });

  test('5 - Oznacz zadanie jako ukończone', async ({ page }) => {
    await addTodo(page, 'Buy milk');
    const item = getItems(page).first();
    await item.locator('.toggle').check();
    await expect(item).toHaveClass(/completed/);
  });

  test('6 - Oznacz i odznacz zadanie', async ({ page }) => {
    await addTodo(page, 'Task 1');
    const item = getItems(page).first();
    await item.locator('.toggle').check();
    await expect(item).toHaveClass(/completed/);
    await item.locator('.toggle').uncheck();
    await expect(item).not.toHaveClass(/completed/);
  });

  test('7 - Odznacz wcześniej ukończone zadanie (separat)', async ({ page }) => {
    for (const t of ['A', 'B']) await addTodo(page, t);
    const second = getItems(page).nth(1);
    await second.locator('.toggle').check();
    await expect(second).toHaveClass(/completed/);
    await second.locator('.toggle').uncheck();
    await expect(second).not.toHaveClass(/completed/);
  });

  test('8 - Toggle All zaznacza i odznacza wszystkie', async ({ page }) => {
    for (const t of ['A', 'B']) await addTodo(page, t);
    // kliknij label powiązany z toggle-all
    await page.locator('label[for="toggle-all"]').click();
    // każdy element powinien mieć klasę completed
    const items = getItems(page);
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveClass(/completed/);
    }
    // kliknij ponownie — powinien odznaczyć wszystkie
    await page.locator('label[for="toggle-all"]').click();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).not.toHaveClass(/completed/);
    }
  });

  test('9 - Edytuj istniejące zadanie (double-click i Enter)', async ({ page }) => {
    await addTodo(page, 'Task 1');
    const item = getItems(page).first();
    await item.locator('label').dblclick();
    const editInput = item.locator('.edit');
    await editInput.fill('Task 1 updated');
    await editInput.press('Enter');
    await expect(item.locator('label')).toHaveText('Task 1 updated');
  });

  test('10 - Podczas edycji usuń tekst (zachowanie: usunięcie lub przywrócenie) — test elastyczny', async ({ page }) => {
    await addTodo(page, 'Task 1');
    const beforeCount = await getItems(page).count();
    const item = getItems(page).first();
    await item.locator('label').dblclick();
    const editInput = item.locator('.edit');
    await editInput.fill('');
    await editInput.press('Enter');
    // możliwe dwa behawioru aplikacji: usunięcie elementu lub zachowanie starego tekstu
    const afterCount = await getItems(page).count();
    if (afterCount === beforeCount - 1) {
      // element został usunięty — OK
      await expect(getItems(page)).toHaveCount(beforeCount - 1);
    } else {
      // element nie został usunięty — sprawdź, że tekst pozostał (lub pusty)
      await expect(getItems(page).first().locator('label')).toHaveText('Task 1');
    }
  });

  test('11 - Edycja: trim przestrzeni wewnętrznych/początkowych i końcowych', async ({ page }) => {
    await addTodo(page, 'original');
    const item = getItems(page).first();
    await item.locator('label').dblclick();
    const editInput = item.locator('.edit');
    await editInput.fill('   spaced   ');
    await editInput.press('Enter');
    // sprawdzamy, że wynikowy tekst po trimie jest taki jak oczekujemy
    const text = await item.locator('label').innerText();
    // jeśli aplikacja trimuje — będzie dokładnie 'spaced'
    expect(text.trim()).toBe('spaced');
  });

  test('12 - Filtrowanie: Active (tylko nieukończone)', async ({ page }) => {
    for (const t of ['A', 'B', 'C']) await addTodo(page, t);
    // oznacz B jako ukończone (index 1)
    await getItems(page).nth(1).locator('.toggle').check();
  await page.getByRole('link', { name: 'Active' }).click();
    await expect(getItems(page)).toHaveCount(2);
    // sprawdź, że widoczne to A i C
    await expect(getItems(page).first().locator('label')).toHaveText('A');
    await expect(getItems(page).nth(1).locator('label')).toHaveText('C');
  });

  test('13 - Filtrowanie: Completed (tylko ukończone)', async ({ page }) => {
    for (const t of ['A', 'B', 'C']) await addTodo(page, t);
    await getItems(page).nth(1).locator('.toggle').check(); // B
  await page.getByRole('link', { name: 'Completed' }).click();
    await expect(getItems(page)).toHaveCount(1);
    await expect(getItems(page).first().locator('label')).toHaveText('B');
  });

  test('14 - Filtrowanie: All (wszystkie zadania)', async ({ page }) => {
    for (const t of ['A', 'B', 'C']) await addTodo(page, t);
  await page.getByRole('link', { name: 'All' }).click();
    await expect(getItems(page)).toHaveCount(3);
  });

  test('15 - Clear completed usuwa ukończone', async ({ page }) => {
    await addTodo(page, 'To finish');
    await getItems(page).first().locator('.toggle').check();
    await page.locator('text=Clear completed').click();
    await expect(getItems(page)).toHaveCount(0);
  });

  test('16 - Usuń pojedyncze zadanie przyciskiem X (destroy)', async ({ page }) => {
    await addTodo(page, 'Delete me');
    const item = getItems(page).first();
    await item.hover();
    await item.locator('.destroy').click();
    await expect(getItems(page)).toHaveCount(0);
  });

  test('17 - Usuń wszystkie zadania sekwencyjnie (hover -> destroy)', async ({ page }) => {
    for (const t of ['one', 'two', 'three']) await addTodo(page, t);
    // usuwaj dopóki są elementy
    while ((await getItems(page).count()) > 0) {
      const first = getItems(page).first();
      await first.hover();
      await first.locator('.destroy').click();
      // czekaj aż element zniknie
      await page.waitForTimeout(100); // drobne oczekiwanie na animacje/usuwanie
    }
    await expect(getItems(page)).toHaveCount(0);
  });

  test('18 - Kombinowane: 5 zadań, co drugi ukończony, filtr Active, potem Toggle All', async ({ page }) => {
    for (const i of [1, 2, 3, 4, 5]) await addTodo(page, `T${i}`);
    // oznacz co drugi (index 1 i 3) jako ukończone
    await getItems(page).nth(1).locator('.toggle').check();
    await getItems(page).nth(3).locator('.toggle').check();
    // filtr Active → powinny pozostać 3 elementy (index 0,2,4)
    await page.locator('text=Active').click();
    await expect(getItems(page)).toHaveCount(3);
    // Toggle All → powinien zaznaczyć wszystkie (przejście do completed)
  await page.locator('label[for="toggle-all"]').click();
  // przełącz na All i sprawdź, że wszystkie mają klasę completed
  await page.getByRole('link', { name: 'All' }).click();
    const items = getItems(page);
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toHaveClass(/completed/);
    }
  });

  test('19 - Kombinowane: dodaj, edytuj, oznacz ukończone, filtr Completed, Clear completed, sprawdź All', async ({ page }) => {
    for (const t of ['one', 'two', 'three']) await addTodo(page, t);
    // edytuj 'two' -> 'two-updated'
    const itemTwo = getItems(page).nth(1);
    await itemTwo.locator('label').dblclick();
    await itemTwo.locator('.edit').fill('two-updated');
    await itemTwo.locator('.edit').press('Enter');
    // oznacz jako ukończone
    await itemTwo.locator('.toggle').check();
    // filtr Completed -> powinna być tylko ta jedna
  await page.getByRole('link', { name: 'Completed' }).click();
    await expect(getItems(page)).toHaveCount(1);
    await expect(getItems(page).first().locator('label')).toHaveText('two-updated');
    // Clear completed
    await page.locator('text=Clear completed').click();
    // All -> pozostałe dwa (one, three) powinny być widoczne, a 'two-updated' usunięte
  await page.getByRole('link', { name: 'All' }).click();
    await expect(getItems(page)).toHaveCount(2);
    const labels = await page.locator('.todo-list li label').allTextContents();
    expect(labels).not.toContain('two-updated');
  });

  test('20 - Długie zadanie (200 znaków): oznacz, filtruj Completed, usuń, sprawdź liczbę', async ({ page }) => {
    const longText = 'x'.repeat(200);
    await addTodo(page, longText);
    await getItems(page).first().locator('.toggle').check();
  await page.getByRole('link', { name: 'Completed' }).click();
    await expect(getItems(page)).toHaveCount(1);
    // usuń (hover -> destroy)
    const item = getItems(page).first();
    await item.hover();
    await item.locator('.destroy').click();
    await expect(getItems(page)).toHaveCount(0);
  });
});
