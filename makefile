# Nama file: Makefile

# Default target (opsional, agar 'make' tanpa argumen menjalankan up)
.DEFAULT_GOAL := jalan


ps:
	@docker ps

# Jalankan docker-compose up dengan --build dan recreate jika sudah ada
jalan:
	@echo "🔄 Starting or recreating containers..."
	@docker-compose up -d --build --force-recreate

# Stop dan hapus container serta network yang terkait
berhenti:
	@echo "🛑 Stopping and removing containers..."
	@docker-compose down -v

# Pause container tanpa menghapusnya
pause:
	@echo "⏸️  Pausing all containers..."
	@docker-compose pause

# Unpause container yang sebelumnya dipause
unpause:
	@echo "▶️  Unpausing all containers..."
	@docker-compose unpause

# Push ke repo dengan commit message yang diberikan
push:
	@git add .
	@git commit -m "$(m)"
	@git push origin main

# Push ke repo dengan commit message yang disertai '[skip ci]'
push-skip-ci:
	@git add .
	@git commit -m "$(m) [skip ci]"
	@git push origin main