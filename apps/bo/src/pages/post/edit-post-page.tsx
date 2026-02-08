import { Alert } from '@/shared/components/molecules/alert'
import { CustomEditor } from '@/shared/components/molecules/editor'
import { UnsavedChangesGuard } from '@/shared/components/molecules/unsaved-changes-guard'
import { usePostDetail, useUpdatePost } from '@/shared/query-hook/post.query'
import { useCategories } from '@/shared/query-hook/user.query'
import { Button, cn, Input, Label, toast } from '@blog/ui'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Plus, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useWatch } from 'react-hook-form'
import { useCreateForm } from './use-post-form'

export const EditPostPage = () => {
  const navigate = useNavigate()

  const { postSeq } = useParams({ from: '/(auth)/posts/edit/$postSeq' })

  const { data: categories } = useCategories()
  const { data: detail, isLoading } = usePostDetail({ postSeq: postSeq })
  const { mutateAsync: updatePost } = useUpdatePost({
    onSuccess: () => toast.success('글이 수정되었습니다.'),
    onError: () => toast.error('글 수정에 실패했습니다. 잠시 후 다시 시도해주세요.'),
  })

  const { form: methods } = useCreateForm()
  const { register, setValue, handleSubmit, control, formState, getValues } = methods
  const { isSubmitting, isDirty } = formState

  const category = useWatch({ control, name: 'category' })
  const [categoryInput, setCategoryInput] = useState('')
  const categoryOptions = useMemo(() => (categories ?? []).map((c) => c.name), [categories])

  const tags = useWatch({ control, name: 'tags' })
  const [tagInput, setTagInput] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  const [postingAlertOpen, setPostingAlertOpen] = useState(false)

  const onSelectCategory = (name: string) => {
    setValue('category', name, { shouldDirty: true, shouldValidate: true })
  }

  const onCategoryChange = (v: string) => {
    setCategoryInput(v)
    setValue('category', v, { shouldDirty: true, shouldValidate: true })
  }

  const onCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCategoryChange('')
    }
  }

  const addTag = (raw: string) => {
    const v = raw.trim()
    if (!v) return
    if (tags.includes(v)) return
    setValue('tags', [...tags, v], { shouldDirty: true, shouldValidate: true })
    setTagInput('')
  }

  const removeTag = (t: string) => {
    setValue(
      'tags',
      tags.filter((x) => x !== t),
      { shouldDirty: true, shouldValidate: true },
    )
  }

  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return
    if ((e.key === 'Enter' || e.key === ' ') && tagInput.trim() !== '') {
      e.preventDefault()
      addTag(tagInput)
    }
  }

  const didInitRef = useRef(false)

  const onClickSave = handleSubmit(() => {
    setPostingAlertOpen(true)
  })

  const handleSave = async () => {
    const values = getValues()
    const res = await updatePost({ params: { postSeq }, body: values })

    methods.reset(values as any)
    setPostingAlertOpen(false)
    navigate({
      to: '/posts/$postSeq',
      params: { postSeq: String(res.data.postSeq) },
    })
  }

  useEffect(() => {
    setCategoryInput(category ?? '')
  }, [category])

  useEffect(() => {
    if (!detail) return
    if (didInitRef.current) return

    methods.reset(
      {
        title: detail.title ?? '',
        content: (detail as any).content ?? '',
        category: (detail as any).category ?? '',
        tags: (detail as any).tags ?? [],
      } as any,
      {
        keepDirty: false,
        keepTouched: false,
      },
    )

    didInitRef.current = true
  }, [detail, methods])

  if (isLoading && !detail) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <p className="text-sm text-muted-foreground">불러오는 중…</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <p className="text-sm text-muted-foreground">게시글을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div>
      <FormProvider {...methods}>
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">Edit Post</h1>
              <p className="text-sm text-muted-foreground">글 수정</p>
            </div>

            <Button
              type="button"
              className="rounded-full px-6"
              onClick={onClickSave}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>

          <section className="mt-10">
            <Label htmlFor="title" className="sr-only">
              Title
            </Label>

            <Input
              id="title"
              placeholder="제목을 입력하세요"
              className="h-auto border-0 bg-transparent px-0 text-3xl! font-semibold shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0"
              {...register('title')}
            />
            <div className="mt-2 h-px w-full bg-border" />
          </section>

          <section className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {categories && (
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">Category</p>

                <div className="mt-3">
                  <Input
                    value={categoryInput}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    onKeyDown={onCategoryKeyDown}
                    placeholder="카테고리를 선택하거나 직접 입력하세요"
                    className="shadow-none"
                    list="category-options"
                  />
                  <datalist id="category-options">
                    {categoryOptions.map((name) => (
                      <option key={name} value={name} />
                    ))}
                  </datalist>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const active = c.name === category
                    return (
                      <button
                        key={c.categoryId}
                        type="button"
                        onClick={() => onSelectCategory(c.name)}
                        className={cn(
                          'rounded-full px-3 py-1.5 text-xs font-medium transition',
                          active
                            ? 'bg-foreground text-background'
                            : 'border bg-background hover:bg-muted/40',
                        )}
                        title={`posts: ${c.postCount}`}
                      >
                        {c.name}
                        <span className="ml-2 text-[10px] opacity-70">{c.postCount}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground">Tags</p>

              <div className="mt-3 flex items-center gap-2">
                <Input
                  value={tagInput}
                  className="shadow-none"
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="엔터/스페이스로 태그 추가"
                  onKeyDown={onTagKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => addTag(tagInput)}
                  aria-label="add tag"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.length !== 0 &&
                  tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="rounded-full p-1 hover:bg-background/60"
                        aria-label={`remove ${t}`}
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold">Content</p>
              </div>
            </div>

            <CustomEditor />
          </section>
        </div>
      </FormProvider>

      <Alert
        title="글을 수정하시겠습니까?"
        description="저장 후 반영됩니다."
        open={postingAlertOpen}
        onChangeOpen={setPostingAlertOpen}
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setPostingAlertOpen(false)}>
              취소
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSubmitting}>
              확인
            </Button>
          </>
        }
      />

      <UnsavedChangesGuard isDirty={isDirty && !postingAlertOpen && !isSubmitting} />
    </div>
  )
}
