import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { BooksPage } from "@/pages/BooksPage";
import { BookPage } from "@/pages/BookPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
