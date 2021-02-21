git_commit := $(shell git rev-parse --short HEAD)
export REACT_APP_VERSION := $(git_commit)

.PHONY: all
all: install build start

.PHONY: install
install:
	yarn install

.PHONY: test
test:
	CI=1 yarn run test

.PHONY: build
build: install
	yarn run build
	echo $(REACT_APP_VERSION) > build/version.txt

.PHONY: start
start:
	yarn run start
