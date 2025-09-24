# PowerShell aliases and functions for Acquisitions API development
# Source this file in your PowerShell profile or run it manually in the project directory

# Development server
function Start-DevServer { npm run dev }
Set-Alias -Name dev -Value Start-DevServer

# Database operations
function Generate-Schema { npm run db:generate }
function Run-Migrations { npm run db:migrate }
function Open-DatabaseStudio { npm run db:studio }
Set-Alias -Name dbgen -Value Generate-Schema
Set-Alias -Name dbmigrate -Value Run-Migrations
Set-Alias -Name dbstudio -Value Open-DatabaseStudio

# Code quality
function Run-Linter { npm run lint }
function Fix-Linter { npm run lint:fix }
function Format-Code { npm run format }
function Check-Format { npm run format:check }
Set-Alias -Name lint -Value Run-Linter
Set-Alias -Name lintfix -Value Fix-Linter
Set-Alias -Name fmt -Value Format-Code
Set-Alias -Name fmtcheck -Value Check-Format

# Quick navigation
function Go-Controllers { Set-Location src/controllers }
function Go-Models { Set-Location src/models }
function Go-Routes { Set-Location src/routes }
function Go-Services { Set-Location src/services }
function Go-Utils { Set-Location src/utils }
function Go-Config { Set-Location src/config }
function Go-Validations { Set-Location src/validations }
function Go-Migrations { Set-Location drizzle }
function Go-Logs { Set-Location logs }
Set-Alias -Name goc -Value Go-Controllers
Set-Alias -Name gom -Value Go-Models
Set-Alias -Name gor -Value Go-Routes
Set-Alias -Name gos -Value Go-Services
Set-Alias -Name gou -Value Go-Utils
Set-Alias -Name gocfg -Value Go-Config
Set-Alias -Name gov -Value Go-Validations
Set-Alias -Name gomig -Value Go-Migrations
Set-Alias -Name golog -Value Go-Logs

# Log viewing
function Show-Logs { 
    param([int]$Lines = 50)
    Get-Content logs/combined.log -Tail $Lines
}
function Show-ErrorLogs { 
    param([int]$Lines = 50)
    Get-Content logs/error.lg -Tail $Lines
}
Set-Alias -Name logs -Value Show-Logs
Set-Alias -Name errors -Value Show-ErrorLogs

# Package management
function Install-Dependencies { npm install }
function Install-Dev { 
    param([string]$Package)
    npm install --save-dev $Package
}
function Install-Prod { 
    param([string]$Package)
    npm install --save $Package
}
Set-Alias -Name deps -Value Install-Dependencies
Set-Alias -Name adddev -Value Install-Dev
Set-Alias -Name add -Value Install-Prod

# Git helpers (if using git)
function Git-Status { git status }
function Git-Add { git add . }
function Git-Commit { 
    param([string]$Message)
    git commit -m $Message
}
function Git-Push { git push }
Set-Alias -Name gs -Value Git-Status
Set-Alias -Name ga -Value Git-Add
Set-Alias -Name gc -Value Git-Commit
Set-Alias -Name gp -Value Git-Push

# Environment management
function Load-Environment { 
    if (Test-Path .env) {
        Get-Content .env | ForEach-Object {
            if ($_ -match '^([^=]+)=(.*)$') {
                [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
            }
        }
        Write-Host "Environment variables loaded from .env" -ForegroundColor Green
    } else {
        Write-Host ".env file not found" -ForegroundColor Yellow
    }
}
Set-Alias -Name loadenv -Value Load-Environment

# Project info
function Show-ProjectInfo {
    Write-Host "=== Acquisitions API Project Info ===" -ForegroundColor Cyan
    Write-Host "Framework: Express.js" -ForegroundColor Green
    Write-Host "Database: PostgreSQL (Neon)" -ForegroundColor Green
    Write-Host "ORM: Drizzle" -ForegroundColor Green
    Write-Host ""
    Write-Host "Common commands:" -ForegroundColor Yellow
    Write-Host "  dev          - Start development server" -ForegroundColor White
    Write-Host "  lint         - Run ESLint" -ForegroundColor White
    Write-Host "  fmt          - Format code" -ForegroundColor White
    Write-Host "  dbgen        - Generate database schema" -ForegroundColor White
    Write-Host "  dbmigrate    - Run migrations" -ForegroundColor White
    Write-Host "  dbstudio     - Open Drizzle Studio" -ForegroundColor White
    Write-Host "  logs         - View application logs" -ForegroundColor White
    Write-Host "  loadenv      - Load .env variables" -ForegroundColor White
}
Set-Alias -Name info -Value Show-ProjectInfo

Write-Host "Acquisitions API aliases loaded successfully!" -ForegroundColor Green
Write-Host "Type 'info' to see available commands." -ForegroundColor Yellow