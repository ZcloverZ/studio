export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-6 mt-12 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} کتاب آنلاین. تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
