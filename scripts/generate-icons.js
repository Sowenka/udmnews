/**
 * Скрипт для генерации PNG иконок из SVG
 * Запуск: node scripts/generate-icons.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = [192, 512]
const svgPath = path.join(__dirname, '../public/icons/icon.svg')
const outputDir = path.join(__dirname, '../public/icons')

async function generateIcons() {
    const svgBuffer = fs.readFileSync(svgPath)

    for (const size of sizes) {
        // Обычная иконка
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join(outputDir, `icon-${size}.png`))

        console.log(`✓ icon-${size}.png`)

        // Maskable иконка (с отступами для safe zone)
        const padding = Math.floor(size * 0.1)
        const innerSize = size - (padding * 2)

        await sharp(svgBuffer)
            .resize(innerSize, innerSize)
            .extend({
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                background: '#111827'
            })
            .png()
            .toFile(path.join(outputDir, `icon-maskable-${size}.png`))

        console.log(`✓ icon-maskable-${size}.png`)
    }

    // Apple Touch Icon
    await sharp(svgBuffer)
        .resize(180, 180)
        .png()
        .toFile(path.join(__dirname, '../public/apple-touch-icon.png'))

    console.log('✓ apple-touch-icon.png')
    console.log('')
    console.log('Иконки сгенерированы!')
}

generateIcons().catch(console.error)
