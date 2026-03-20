.PHONY: install format lint test build update clean dev next merge-next
SHELL := /bin/bash
DEFAULT_GOAL := build

install:
	bun install --no-audit --no-fund

format:
	bunx oxfmt

lint: install format
	bunx oxlint --fix

test: lint
	bun test --coverage

test-lcov: lint
	bun test --coverage --coverage-reporter=lcov --coverage-dir=coverage

build: test
	rm -Rf dist
	bunx tsc --build

update:
	bun upgrade
	bunx npm-check-updates -u
	bunx install --no-audit --no-fund

clean:
	rm -Rf node_modules dist

dev:
	bunx ts-node src/main.ts

next:
# switch to 'next' branch if it exists, or create it if it doesn't
	git fetch --prune
	(git checkout next 2>/dev/null || git checkout -b next)

merge-next:
# merge the next branch into main by rebase
	git checkout main
	git pull origin main
	git checkout next
	git rebase main
	git checkout main
	git merge next --ff-only
	git push origin main
	sleep 5
	git fetch --prune
