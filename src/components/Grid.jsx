const Grid = () => {
  const logos = [
    '911memorial.org',
    'redcross.org',
    'fema.gov',
    'fdnyfoundation.org',
    'nypdfoundation.org',
    'panynj.gov',
    'salvationarmyusa.org',
    'uwnyc.org',
    'cdc.gov',
  ]

  return (
    <section
      aria-label="Logos of remembrance, relief, and first-response organizations"
      className="ml-60 mr-50 flex flex-col items-center justify-between gap-20 py-20 lg:flex-row"
    >
      <div className="max-w-xl">
        <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Remembering together
        </p>
        <h2 className="mb-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          A day that brought people together
        </h2>
        <p className="text-lg leading-relaxed text-slate-600">
          We remember the lives lost on September 11, 2001, and recognize the
          strength, compassion, and solidarity shown by communities in the days
          that followed.
        </p>
      </div>

      <div
        className="grid gap-2 lg:ml-auto"
        style={{ gridTemplateColumns: 'repeat(3, 4rem)' }}
      >
        {logos.map((domain) => (
          <div
            key={domain}
            className="flex size-16 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
              alt={`${domain} logo`}
              className="size-9 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Grid
