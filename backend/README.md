# Backend

```sh
# Install dependencies for development
uv sync --extra dev

# Fix Style
ruff format .

# Check style matches
ruff format . --check

# Typecheck
mypy

# Lint
ruff check .

# Run tests and output coverage
coverage run -m unittest
coverage html
coverage report --skip-empty

# Run with refresh
uvicorn src.app:app --reload

# Export requirements.txt
uv pip compile pyproject.toml -o requirements.txt
```
