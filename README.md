**basic-miktex-24.1-x64** and using it for document conversion.

---

# 📘 **README – MiKTeX Installation & Document Conversion**

This document explains how to install **MiKTeX (basic-miktex-24.1-x64)** and use it for generating **PDF** files (for example, using Pandoc to convert Markdown or LaTeX documents).

---

## 📥 1. **Download MiKTeX**

1. Go to the official MiKTeX download page:
   [https://miktex.org/download](https://miktex.org/download)
2. Select **Basic MiKTeX Installer (64-bit)**.
3. Download the file:
   **`basic-miktex-24.1-x64.exe`**

---

## 🛠️ 2. **Install MiKTeX**

1. Run the installer.
2. Choose:

   * **Install MiKTeX for: Only for me**
   * Installation location → keep default
   * **Install missing packages on-the-fly** → select **Yes**
3. Complete the installation.

---

## 🔍 3. **Verify the Installation**

Open **Command Prompt** and run:

```sh
latex --version
```

or

```sh
pdflatex --version
```

If version information appears, MiKTeX is successfully installed.

---

## 📄 4. **Convert Documents to PDF (Optional – Pandoc)**

If you use **Pandoc** to generate PDFs, run:

```sh
pandoc input.md -o output.pdf
```

Pandoc will automatically use MiKTeX to generate the PDF.
