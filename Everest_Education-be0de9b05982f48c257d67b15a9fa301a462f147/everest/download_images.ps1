
$images = @{
    "medicine" = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
   يٍ "dentistry" = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80"
    "pharmacy" = "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80"
    "software-engineering" = "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&q=80"
    "architecture" = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
    "business-admin" = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
    "ai-engineering" = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    "physiotherapy" = "https://images.unsplash.com/photo-1576091160550-2187d80a851f?w=800&q=80"
    "nursing" = "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=800&q=80"
    "civil-engineering" = "https://images.unsplash.com/photo-1531834685032-c34bf0d84c71?w=800&q=80"
    "psychology" = "https://images.unsplash.com/photo-1471820984852-c0e816a4b504?w=800&q=80"
    "new-media" = "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80"
    "mba" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    "ai-masters" = "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80"
    "industrial-engineering" = "https://images.unsplash.com/photo-1581093458791-9f302e683800?w=800&q=80"
    "it-masters" = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    "public-health" = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80"
    "international-relations" = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
    "phd-business" = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
    "phd-aerospace" = "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80"
    "phd-political-science" = "https://images.unsplash.com/photo-1541872703-74c5963631df?w=800&q=80"
    "phd-dentistry" = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
    "anesthesia-diploma" = "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
    "optics-diploma" = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"
    "computer-programming" = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80"
    "culinary-arts" = "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&q=80"
    "pharmacy-services" = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
    "medical-lab" = "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80"
}

$destDir = "public/images/specialties"
if (!(Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
    Write-Host "Created directory $destDir"
}

foreach ($key in $images.Keys) {
    $url = $images[$key]
    $output = "$destDir/$key.jpg"
    Write-Host "Downloading $key..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
        Write-Host "  Success"
    } catch {
        Write-Host "  Failed to download $key : $_"
    }
}
