import os
import json
import re

# Diretórios
BASE_DIR   = "learn-go-with-tests"
OUTPUT_DIR = "project/katas"
# Pastas a ignorar
EXCLUDE    = {"vendor", ".git", ".github"}


def map_difficulty(path: str) -> str:
    """
    Mapeia o sufixo 'v<n>' no nome da pasta para um nível de dificuldade:
    - v1 e v2   -> Fácil
    - v3 e v4   -> Intermediário
    - v5 ou mais -> Difícil
    Pastas sem padrão 'v<n>' ficam como Intermediário.
    """
    name = os.path.basename(path)
    m = re.match(r"v(\d+)$", name)
    if m:
        ver = int(m.group(1))
        if ver <= 2:
            return "Fácil"
        elif ver <= 4:
            return "Intermediário"
        else:
            return "Difícil"
    # valor padrão para capítulos ou pastas gerais
    return "Intermediário"


def find_kata_dirs(base):
    """
    Retorna todos os diretórios que contenham:
    - README.md
    - ou .go + _test.go
    Ignora `base` e subpastas em EXCLUDE.
    """
    for root, dirs, files in os.walk(base):
        parts = set(root.split(os.sep))
        if parts & EXCLUDE or root == base:
            continue
        has_readme = "README.md" in files
        has_code   = any(f.endswith(".go") and not f.endswith("_test.go") for f in files)
        has_tests  = any(f.endswith("_test.go") for f in files)
        if has_readme or (has_code and has_tests):
            yield root


def extract_from_dir(path):
    """
    Extrai título, conteúdo, código e testes de um diretório Go.
    """
    readme = os.path.join(path, "README.md")
    if os.path.isfile(readme):
        title   = os.path.basename(path).replace("-", " ").title()
        content = open(readme, encoding="utf-8").read().strip()
    else:
        title = os.path.basename(path).replace("-", " ").title()
        content = ""

    correct_code = ""
    test_code = ""
    tests = []

    for f in os.listdir(path):
        full_path = os.path.join(path, f)
        if f.endswith(".go") and not f.endswith("_test.go"):
            with open(full_path, encoding="utf-8") as src_file:
                code = src_file.read()
                correct_code += code + "\n"
                # tenta extrair comentário como descrição
                if not content:
                    m_doc = re.search(r'//\s*(.+)', code)
                    if m_doc:
                        content = m_doc.group(1)

                # tenta extrair nome da função para título
                m_fn = re.search(r'func\s+([A-Za-z0-9_]+)\s*\(', code)
                if m_fn and not title:
                    title = m_fn.group(1)

        elif f.endswith("_test.go"):
            with open(full_path, encoding="utf-8") as test_file:
                test_code += test_file.read() + "\n"
                # extrai exemplos simples
                tests_src = test_code
                arrs = re.findall(r'\[\d+\]\w*\{([0-9,\s]+)\}', tests_src)
                wants = re.findall(r'want\s*:=\s*([0-9]+)', tests_src)
                for arr_str, want_str in zip(arrs, wants):
                    nums = [int(x.strip()) for x in arr_str.split(",") if x.strip().isdigit()]
                    if nums:
                        tests.append({"input": nums, "expected": int(want_str)})

    # monta resultado
    data = {
        "title": title,
        "content": content,
        "correct_code": correct_code.strip(),
        "test_code": test_code.strip(),
        "difficulty": map_difficulty(path)
    }

    if tests:
        data["tests"] = tests

    return data


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for kata_dir in find_kata_dirs(BASE_DIR):
        data = extract_from_dir(kata_dir)
        # atribui dificuldade dinâmica
        data["difficulty"] = map_difficulty(kata_dir)

        rel   = os.path.relpath(kata_dir, BASE_DIR)
        slug  = rel.replace(os.sep, "_")
        fname = f"{slug}.json"

        with open(os.path.join(OUTPUT_DIR, fname), "w", encoding="utf-8") as out:
            json.dump(data, out, ensure_ascii=False, indent=2)

        print(f"Exported {data['title']} → {fname}")

if __name__ == "__main__":
    main()
