# Backend

```sh
# Install Dependencies
poetry install

# Open Virtual Enviroment
poetry shell

# Fix Style
isort .
ruff format .

# Check style matches
isort . --check-only
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
poetry export -f requirements.txt --output requirements.txt --without-hashes
```
