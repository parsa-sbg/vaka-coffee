"use client";
import React, { useState } from 'react';
import 'quill/dist/quill.snow.css';
import styles from '@/css/quill.module.css';

import ArticleEditor from '@/components/layouts/ArticleEditor/ArticleEditor';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { BiSolidImageAdd } from 'react-icons/bi';
import Image from 'next/image';
import { LuImageOff } from 'react-icons/lu';
import { articleSchema } from '@/validation/article';
import toast from 'react-hot-toast';
import ErrorAlert from '@/components/common/alerts/ErrorAlert';
import SuccessAlert from '@/components/common/alerts/SuccessAlert';
import { useRouter } from 'next/navigation';

function Page() {

  const [errors, setErrors] = useState({ shortName: false, title: false, description: false, content: false })
  const [content, setContent] = useState('<h1 class="ql-align-justify"><span style="background-color: rgb(26, 26, 26); color: rgb(209, 153, 96);" class="ql-size-large">تاریخچه قهوه بوربن</span></h1><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="background-color: rgb(26, 26, 26); color: rgb(255, 255, 255);">قهوه بوربن یکی از زیرگونه‌های اصلی قهوه عربیکا است که منشأ آن به جزیره بوربن (که اکنون به نام جزیره رئونیون در اقیانوس هند شناخته می‌شود) برمی‌گردد. در اوایل قرن هفدهم، قهوه به این جزیره از یمن آورده شد و در طول سال‌ها، به دلیل شرایط خاص آب و هوایی و خاک حاصلخیز، این گیاه ویژگی‌های خاص و منحصر به فردی پیدا کرد.</span></p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><h2 class="ql-align-justify"><span style="background-color: rgb(26, 26, 26); color: rgb(209, 153, 96);" class="ql-size-large">ویژگی‌های گیاه قهوه بوربن</span></h2><p class="ql-align-justify"><br></p><p class="ql-align-justify"><span style="background-color: rgb(26, 26, 26); color: rgb(255, 255, 255);">این قهوه از نظر ویژگی‌های گیاهی نیز منحصر به فرد است. این گیاه به طور کلی دارای ارتفاع متوسطی است و شاخه‌های آن به صورت پراکنده رشد می‌کنند. در مقایسه با گونه‌های دیگر قهوه عربیکا، گیاه بوربن نیاز به مراقبت‌های بیشتری دارد، اما بازدهی و کیفیت دانه‌های آن بالاست.</span></p><h2 class="ql-align-right"><br></h2>');
  const [shortName, setShortName] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | undefined>(undefined)
  const [imagePreview, setImagePreview] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const route = useRouter()

  const imageChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setErrors(prev => ({ ...prev, image: false }))
      reader.onload = () => {
        setImage(file)
        setImagePreview(reader.result as string)
        e.target.value = ''
      };

      reader.readAsDataURL(file);
    }
  }


  const createNewAtricle = async () => {
    // client validation

    const parsedData = articleSchema.safeParse({
      shortName,
      description,
      content,
      title,
      image
    })

    if (!parsedData.success) {
      parsedData.error.issues.forEach(issue => {
        setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
        toast.custom((t) => (
          <ErrorAlert t={t} title={issue.message} />
        ), {
          position: 'top-left'
        })
      })
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('shortName', shortName)
    formData.append('description', description)
    formData.append('content', content)
    if (image) {
      formData.append('image', image)
    }
    setIsLoading(true)
    const res = await fetch('/api/articles', {
      method: "POST",
      body: formData
    })
    setIsLoading(false)


    if (res.status == 201) {
      const timeout = setTimeout(() => {
        route.replace('/p-admin/articles')
      }, 2000);

      toast.custom((t) => (
        <SuccessAlert t={t} title='مقاله با موفقیت اضافه شد .' callBack={() => {
          clearTimeout(timeout)
          route.replace('/p-admin/articles')
        }} />
      ), {
        position: 'top-left',
        duration: 2000
      })
    } else {
      toast.custom((t) => (
        <ErrorAlert t={t} title='خطایی رخ داد !' />
      ), {
        position: 'top-left'
      })
    }

  }


  return (
    <>
      <div className='flex justify-between'>
        <h1 className='font-bold text-xl relative pr-3 before:absolute before:w-2 before:h-2 before:rounded-full before:bg-white before:right-0 before:top-0 before:bottom-0 before:my-auto'>افزودن مقاله</h1>
        <Link href={'/p-admin/articles'} className='flex items-center gap-2'>
          <span>بازگشت</span>
          <FaArrowLeft />
        </Link>
      </div>


      <div className='bg-[#0f0f0f] rounded-3xl p-5 my-5 grid grid-cols-5 md:grid-cols-12 gap-5'>

        <div className='grid md:grid-cols-2 xl:grid-cols-1 gap-5 col-span-5 md:col-span-12 xl:col-span-3'>
          <div className={`flex flex-col gap-1 ${errors.title ? 'text-red-600' : ''} `}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>عنوان مقاله</h5>
            <input maxLength={20} value={title} onChange={(e) => {
              setTitle(e.target.value)
              setErrors(prev => ({ ...prev, title: false }))
            }} className={`${errors.title ? '!border-red-600' : ''} transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} placeholder='عنوان مقاله ...' type="text" />
          </div>

          <div className={`flex flex-col gap-1 ${errors.shortName ? 'text-red-600' : ''} `}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>نام کوتاه</h5>
            <input maxLength={20} value={shortName} onChange={(e) => {
              setShortName(e.target.value)
              setErrors(prev => ({ ...prev, shortName: false }))
            }} className={`${errors.shortName ? '!border-red-600' : ''} transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} placeholder='نام کوتاه ...' type="text" />
          </div>
        </div>

        <div className={`flex flex-col col-span-5 md:col-span-6 xl:col-span-4 gap-1 ${errors.description ? 'text-red-600' : ''} `}>
          <h5 className='mb-1 font-semibold transition-all duration-300'>توضحات کوتاه</h5>
          <textarea onChange={e => {
            setErrors(prev => ({ ...prev, description: false }))
            setDescription(e.target.value)
          }} value={description} placeholder='توضحات کوتاه ...' className={`${errors.description ? '!border-red-600' : ''} custom-scrollbar min-h-24 h-full resize-none transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} />
        </div>

        <div className={`flex flex-col gap-4 col-span-5 md:col-span-6 xl:col-span-5`}>
          <h5 className='mb-1 font-semibold transition-all duration-300'>عکس</h5>

          <div className='flex items-center justify-evenly'>

            <div className="group col-span-1 border-2 w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-41 xl:h-41 !border-opacity-50 hover:!border-opacity-100 transition-colors border-dashed relative dark:border-gray-500 cursor-pointer rounded-lg ">
              <input
                onChange={e => { imageChangehandler(e) }}
                className="w-full h-full absolute bg-red-300 cursor-pointer z-20 opacity-0 hover:file:cursor-pointer"
                type="file"
                accept="image/png,image/jpeg"
              />
              <BiSolidImageAdd className="absolute top-0 bottom-0 right-0 left-0 m-auto opacity-50 transition-all group-hover:opacity-100" size={35} />
            </div>

            {imagePreview
              ? <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-41 xl:h-41 rounded-md overflow-hidden'>
                <Image className='object-cover w-full h-full' width={200} height={200} alt='' src={imagePreview} ></Image>
              </div>

              : <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-41 xl:h-41 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
            }

          </div>
        </div>


      </div>

      <ArticleEditor content={content} setContent={setContent} />

      <div className='flex justify-center mt-5'>
        <button disabled={isLoading} onClick={createNewAtricle} className='py-1.5 px-10 h-8 w-40 bg-green-700 transition-colors duration-300 hover:bg-green-800 rounded-lg'>
          {isLoading
            ? <div className='w-4 h-4 border-x-2 border-white rounded-full animate-spin mx-auto' />
            : 'ثبت مقاله'
          }
        </button>
      </div>

      <div className="mt-10">
        <h3 className='font-bold text-xl relative pr-3 before:absolute before:w-2 before:h-2 before:rounded-full before:bg-white before:right-0 before:top-0 before:bottom-0 before:my-auto'>خروجی مقاله :</h3>
        <div className={`mt-5 border rounded-lg p-5 border-secondary`} style={styles} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
}

export default Page;