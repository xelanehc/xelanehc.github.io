export const metadata = {
  title: "Contact",
  description: "Get in touch with Alex Chen.",
};

export default function ContactPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">
        I’m open to internships and collaborations. Reach me at:
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        <li>
          Email: <a className="hover:underline" href="mailto:achen1452@gmail.com">achen1452@gmail.com</a>
        </li>
        <li>
          GitHub: <a className="hover:underline" href="https://github.com/xelanehc" target="_blank">github.com/xelanehc</a>
        </li>
        <li>
          LinkedIn: <a className="hover:underline" href="https://www.linkedin.com/in/alexchen694" target="_blank">linkedin.com/in/alexchen694</a>
        </li>
      </ul>
    </section>
  );
}


