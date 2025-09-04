const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByLabel('username')
    const password = await page.getByLabel('password')
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page,'mluukkai','salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page,'mluukkai','wrong')
      await expect(page.getByText('login to application')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page,'mluukkai','salainen')
    })
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page,'testTitle','testAuthor','testUrl')
      await expect(page.getByText('testTitle testAuthor')).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      await createBlog(page,'testTitle','testAuthor','testUrl')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
    test('a blog can be deleted by user', async ({ page }) => {
      await createBlog(page,'testTitle','testAuthor','testUrl')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('testTitle testAuthor')).not.toBeVisible()
    })
    test('only user who added can see remove', async ({ page }) => {
      await createBlog(page,'testTitle','testAuthor','testUrl')
      await page.getByRole('button', { name: 'logout' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
    test('likes sort', async ({ page }) => {
      await createBlog(page,'testTitle1','testAuthor1','testUrl1')
      await expect(page.getByText('testTitle1 testAuthor1')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      await createBlog(page,'testTitle2','testAuthor2','testUrl2')
      await expect(page.getByText('testTitle2 testAuthor2')).toBeVisible()
      await page.getByRole('button', { name: 'view' }).click()

      await page.getByRole('button', { name: 'like' }).last().click()
      await expect(page.getByText('likes 1')).toBeVisible()
      
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).last().click()

      await expect(page.getByText('likes 0')).not.toBeVisible()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})