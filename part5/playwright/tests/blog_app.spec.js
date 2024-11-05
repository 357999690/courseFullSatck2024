const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data : {
                name: 'Caro',
                username: 'Caro',
                password: 'Caro'
            }
        })

        await page.goto('http://localhost:5174')
    })

    test('Login form is shown', async ({ page }) => {
        expect(page.getByTestId('username')).toBeVisible
        expect(page.getByTestId('password')).toBeVisible
        expect(page.getByRole('button', { name: 'login'})).toBeVisible
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Caro')
            await page.getByTestId('password').fill('Caro')
            await page.getByRole('button', { name: 'login'}).click()

            await expect(page.getByText('Caro logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('Caro')
            await page.getByTestId('password').fill('caros')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('Caro')
            await page.getByTestId('password').fill('Caro')
            await page.getByRole('button', { name: 'login'}).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'a new blog'}).click()
            await page.getByTestId('title').fill('chau')
            await page.getByTestId('author').fill('chau')
            await page.getByTestId('url').fill('chau')
            await page.getByRole('button', { name: 'create' }).click()
            // await page.getByText('chau chau').waitFor()

            await expect(page.getByTestId('blogShown').getByText('chau chau')).toBeVisible()
        })

        describe('blog creates' , () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'a new blog' }).click()
                await page.getByTestId('title').fill('chau')
                await page.getByTestId('author').fill('chau')
                await page.getByTestId('url').fill('chau')
                await page.getByRole('button', { name: 'create' }).click()
            })

            test('blog can edit', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click()

                await expect(page.getByText(1)).toBeVisible()
            })

            test('drope blog', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page. getByRole('button', { name: 'remove' }).click()
                page.on('dialog', dialog => dialog.accept())

                await expect(page.getByTestId('blogShown').getByText('chau chau')).not.toBeVisible()
            })

            test('only owner can delete', async ({ page, request }) => {
                await page.getByRole('button', { name: 'logOut' }).click()
                await request.post('http://localhost:3003/api/users', {
                    data : {
                        name: 'Lucas',
                        username: 'Lucas',
                        password : 'Lucas'
                    }
                })

                await page.getByTestId('username').fill('Lucas')
                await page.getByTestId('password').fill('Lucas')
                await page.getByRole('button', { name: 'login'}).click()
                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })

            test.only('blogs in order', async ({ page, request }) => {
                await page.getByRole('button', { name: 'a new blog'}).click()
                await page.getByTestId('title').fill('hola')
                await page.getByTestId('author').fill('hola')
                await page.getByTestId('url').fill('hola')
                await page.getByRole('button', { name: 'create' }).click()
                

            })
        })
    })

    
})