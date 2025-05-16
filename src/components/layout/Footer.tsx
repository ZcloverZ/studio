export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8 mt-12 shadow-inner border-t border-border/50">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} کتاب آنلاین. تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
