$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$env:JAVA_HOME = "D:\jdk-21"
$env:ANDROID_HOME = "D:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "D:\Android\Sdk"
$env:GRADLE_USER_HOME = "D:\gradle-home"

node scripts/ensure-capacitor-routes.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

npm run build:static
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

npx cap sync android
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not (Test-Path "android\local.properties")) {
  Set-Content -Path "android\local.properties" -Value "sdk.dir=D\:\\Android\\Sdk" -Encoding ascii
}

Push-Location android
.\gradlew.bat assembleDebug --no-daemon
$code = $LASTEXITCODE
Pop-Location
if ($code -ne 0) { exit $code }

Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" "npu-site.apk" -Force
Write-Host "APK ready: $root\npu-site.apk"
