'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Download } from 'lucide-react'
// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Home() {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedImage, setSelectedImage] = useState('/Black.png')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const subscriptionImages = [
    { id: 'black', name: 'Black', url: '/Black.png' },
    { id: 'blue', name: 'Blue', url: '/Blue.png' },
    { id: 'orange', name: 'Orange', url: '/Orange.png' },
    { id: 'white1', name: 'White 1', url: '/White-1.png' },
    { id: 'white2', name: 'White 2', url: '/White-2.png' },
  ]

  // Function to determine text color based on background
  const getTextColor = (imageUrl: string) => {
    // Black template: name in #f37521, rest in #fff9ed
    if (imageUrl === '/Black.png') {
      return '#f37521'
    }
    // Blue template: name in #f37521, rest in #1b1b1b
    if (imageUrl === '/Blue.png') {
      return '#f37521'
    }
    // White templates: name in #f37521, rest in #1b1b1b
    if (imageUrl === '/White-1.png' || imageUrl === '/White-2.png') {
      return '#f37521'
    }
    // Orange template: name in #1b1b1b, rest in #fff9ed
    if (imageUrl === '/Orange.png') {
      return '#1b1b1b'
    }
    // Default color
    return '#FFFFFF'
  }

  // Function to determine secondary text color based on background
  const getSecondaryTextColor = (imageUrl: string) => {
    // Black template: rest in #fff9ed
    if (imageUrl === '/Black.png') {
      return '#fff9ed'
    }
    // Blue template: rest in #1b1b1b
    if (imageUrl === '/Blue.png') {
      return '#1b1b1b'
    }
    // White templates: rest in #1b1b1b
    if (imageUrl === '/White-1.png' || imageUrl === '/White-2.png') {
      return '#1b1b1b'
    }
    // Orange template: rest in #fff9ed
    if (imageUrl === '/Orange.png') {
      return '#fff9ed'
    }
    // Default color
    return '#FFFFFF'
  }

  // Function to determine icon color based on background
  const getIconColor = (imageUrl: string) => {
    // Black template: icons in #f37521
    if (imageUrl === '/Black.png') {
      return '#f37521'
    }
    // Blue template: icons in #f37521
    if (imageUrl === '/Blue.png') {
      return '#f37521'
    }
    // White templates: icons in #f37521
    if (imageUrl === '/White-1.png' || imageUrl === '/White-2.png') {
      return '#f37521'
    }
    // Orange template: icons in #1b1b1b
    if (imageUrl === '/Orange.png') {
      return '#1b1b1b'
    }
    // Default color
    return '#FFFFFF'
  }

  // Generate image whenever form fields or selected template change
  useEffect(() => {
    if (name || position || phone || email) {
      generatePreviewImage()
    }
  }, [name, position, phone, email, selectedImage])

  // Function to create SVG data URL for icons
  const createIconDataUrl = (paths: string[], color: string, size: number) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${paths.map((path) => `<path d="${path}"></path>`).join('')}
      </svg>
    `
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  const generatePreviewImage = () => {
    if (!name && !position && !phone && !email) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the subscription image
      ctx.drawImage(img, 0, 0)

      // Set text properties - using Helvetica font
      const nameColor = getTextColor(selectedImage)
      const secondaryColor = getSecondaryTextColor(selectedImage)
      const iconColor = getIconColor(selectedImage)

      // Name styling: 136px, bold
      ctx.fillStyle = nameColor
      ctx.font = 'bold 136px Helvetica, Arial, sans-serif'
      ctx.textAlign = 'left'

      // Position styling: 90px, regular
      ctx.font = '90px Helvetica, Arial, sans-serif'

      // Phone and email styling: 78px, regular
      ctx.font = '78px Helvetica, Arial, sans-serif'

      // Add user information to the image (positioned with 100px left margin and 70px top margin)
      const xPosition = 100 // Left margin of 100px
      const startY = 220 // Top margin of 70px

      // Draw name
      ctx.font = 'bold 136px Helvetica, Arial, sans-serif'
      ctx.fillStyle = nameColor
      ctx.fillText(name || 'Seu Nome', xPosition, startY)

      // Draw position (closer to name)
      ctx.font = '90px Helvetica, Arial, sans-serif'
      ctx.fillStyle = secondaryColor
      ctx.fillText(position || 'Seu Cargo', xPosition, startY + 120)

      // Create icon data URLs (80x80px icons)
      const phoneIconUrl = createIconDataUrl(
        [
          'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
        ],
        iconColor,
        80
      )

      const mailIconUrl = createIconDataUrl(
        [
          'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
          'M22,6 12,13 2,6',
        ],
        iconColor,
        80
      )

      // Draw phone icon and text (increased spacing between icon and text by 10px)
      const phoneIcon = new window.Image()
      phoneIcon.onload = () => {
        // Center icon with text
        ctx.drawImage(phoneIcon, xPosition, startY + 290, 80, 80)

        ctx.font = '78px Helvetica, Arial, sans-serif'
        ctx.fillStyle = secondaryColor
        // Increased spacing from icon to text (100 + 80 + 20 = 200)
        ctx.fillText(phone || '61 9 9999-9999', xPosition + 110, startY + 350)

        // Draw email icon and text (increased spacing between icon and text by 10px)
        const mailIcon = new window.Image()
        mailIcon.onload = () => {
          // Center icon with text
          ctx.drawImage(mailIcon, xPosition, startY + 400, 80, 80)

          ctx.font = '78px Helvetica, Arial, sans-serif'
          ctx.fillStyle = secondaryColor
          // Increased spacing from icon to text (100 + 80 + 20 = 200)
          ctx.fillText(
            email || 'exemplo@c7auto.com',
            xPosition + 110,
            startY + 460
          )

          // Set the generated image
          setGeneratedImage(canvas.toDataURL('image/png'))
        }
        mailIcon.src = mailIconUrl
      }
      phoneIcon.src = phoneIconUrl
    }
    img.src = selectedImage
  }

  const handleDownloadImage = () => {
    if (!name || !position || !phone || !email) {
      alert('Please fill in all fields')
      return
    }

    if (!generatedImage) {
      alert('Please wait for the image to generate')
      return
    }

    // Create download link
    const link = document.createElement('a')
    link.download = `assinaturaC7-${name.replace(/\s+/g, '-')}.png`
    link.href = generatedImage
    link.click()
  }

  return (
    <div className='my-5 border border-gray-50/20 rounded-2xl min-h-screen flex flex-col bg-[var(--background)]/70 w-3xl mx-auto p-4 md:p-8'>
      <main className='w-full max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6 text-center font-mono bg-gradient-to-r from-[#6e6e6e] to-[#fff9ed] bg-clip-text text-transparent'>
          Gerador de Assinatura de E-mail
        </h1>

        <div className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium mb-2'>
              Nome
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete='off'
              className='w-full px-4 py-3 border bg-[#fff9ed] border-[#f37521] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f37521]text-lg text-[#1b1b1b]'
              placeholder='John Doe'
            />
          </div>

          <div>
            <label
              htmlFor='position'
              className='block text-sm font-medium mb-2'
            >
              Cargo
            </label>
            <input
              type='text'
              id='position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              autoComplete='off'
              className='w-full px-4 py-3 border bg-[#fff9ed] border-[#f37521] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f37521]text-lg text-[#1b1b1b]'
              placeholder='Ex.: Analista de Google Ads'
            />
          </div>

          <div>
            <label htmlFor='phone' className='block text-sm font-medium mb-2'>
              Telefone
            </label>
            <input
              type='tel'
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete='off'
              className='w-full px-4 py-3 border bg-[#fff9ed] border-[#f37521] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f37521]text-lg text-[#1b1b1b]'
              placeholder='61 9 9999-9999'
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              className='w-full px-4 py-3 border bg-[#fff9ed] border-[#f37521] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f37521]text-lg text-[#1b1b1b]'
              placeholder='exemplo@c7auto.com'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-2'>
              <h2 className='text-2xl font-bold mb-4 text-center'>
                Selecione o template da assinatura
              </h2>
            </label>
            {/* Swiper for template selection */}
            <div className='relative'>
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                breakpoints={{
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  // when window width is >= 1024px
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                }}
                className='mySwiper'
              >
                {subscriptionImages.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div
                      className={`border rounded-lg p-2 cursor-pointer transition-all h-full ${
                        selectedImage === image.url
                          ? 'border-[#f37521] rounded-xl'
                          : 'border-gray-100 hover:border-gray-300 rounded-xl'
                      }`}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <div className='h-48 relative'>
                        <Image
                          src={image.url}
                          alt={image.name}
                          fill
                          className='object-cover w-full h-full inset-0 absolute rounded-lg'
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Generated Image Preview */}
          {generatedImage && (
            <div className='mt-8'>
              <h2 className='text-2xl font-bold mb-4 text-center'>
                Sua assinatura de e-mail
              </h2>
              <div className='overflow-hidden flex justify-center'>
                <img
                  src={generatedImage}
                  alt='Generated email signature'
                  className='max-w-full h-auto'
                />
              </div>
              <div className='mt-6 text-center flex justify-center gap-4'>
                <button
                  onClick={handleDownloadImage}
                  className='flex gap-2 items-center py-3 px-6 bg-[#f37521] hover:brightness-90 cursor-pointer text-white font-medium text-lg rounded-md transition-all duration-300'
                >
                  <Download size={24} /> Download
                </button>
              </div>
            </div>
          )}

          {/* Hidden canvas for image generation */}
          <canvas ref={canvasRef} className='hidden' />
        </div>
      </main>
    </div>
  )
}
