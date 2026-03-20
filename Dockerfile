FROM ubuntu:24.04

# Install necessary packages for development
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates bash curl git gnupg make openssh-client python3 zsh unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user for development
RUN adduser --disabled-password --gecos "" --shell /usr/bin/zsh dev
USER dev

# Install oh-my-zsh and set zsh as the default shell
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install nvm, Node.js LTS version
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
RUN export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    nvm install --lts && \
    nvm use --lts && \
    nvm alias default lts/*

# Install Bun for the dev user so bun/bunx are available in interactive shells.
ENV BUN_INSTALL=/home/dev/.bun
ENV PATH="${BUN_INSTALL}/bin:${PATH}"
RUN curl -fsSL https://bun.sh/install | bash \
	&& ln -sf "${BUN_INSTALL}/bin/bun" "${BUN_INSTALL}/bin/bunx"

# Install global npm packages
RUN bun install -g skills

# Install skills for GitHub Copilot
RUN export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
    skills add spillwavesolutions/mastering-typescript-skill@mastering-typescript -y -g --agent github-copilot && \
    skills add ramziddin/solid-skills@solid -y -g --agent github-copilot && \
    skills add github/awesome-copilot@documentation-writer -y -g --agent github-copilot && \
    skills add github/awesome-copilot@refactor -y -g --agent github-copilot && \
    skills add github/awesome-copilot@git-commit -y -g --agent github-copilot && \
    skills add shadcn/ui@shadcn -y -g --agent github-copilot
