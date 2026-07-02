(function () {
  const probability = 0.3;

  // Prevent redirect loops if arriving on error.html
  const onErrorPage = location.pathname.endsWith('error.html');
  if (onErrorPage) {
    // Clear the tag so normal page can work after going back
    sessionStorage.removeItem('erroredReload');
    return;
  }

  try {
    // 1) First visit logic
    const firstVisitFlag = 'firstVisitDone';
    const isFirstVisit = !localStorage.getItem(firstVisitFlag);
    if (isFirstVisit) {
      localStorage.setItem(firstVisitFlag, '1'); // mark as visited
      if (Math.random() < probability) {
        window.location.replace('error.html');
        return;
      }
    }

    // 2) Reload logic
    const nav = performance.getEntriesByType('navigation')[0];
    const isReload = nav ? nav.type === 'reload' : performance.navigation.type === 1;
    if (isReload) {
      if (Math.random() < probability) {
        const alreadyErrored = sessionStorage.getItem('erroredReload');
        if (!alreadyErrored) {
          sessionStorage.setItem('erroredReload', '1');
          window.location.replace('error.html');
          return;
        } else {
          sessionStorage.removeItem('erroredReload');
        }
      }
    }
  } catch (e) {

  }
})();

window.addEventListener('DOMContentLoaded', function () {
    // Set the volume when an audio element exists on the current page.
    var audio = document.getElementById('background-audio');
    if (audio) {
        audio.volume = 0.1;
    }

    var uploadButton = document.getElementById('uploadButton');
    if (!uploadButton) {
        return;
    }

    var fileListContainer = document.getElementById('fileList');
    var fileCount = document.getElementById('fileCount');
    var requiredSourceStatus = document.getElementById('requiredSourceStatus');
    var missingCount = document.getElementById('missingCount');
    var missingListContainer = document.getElementById('missingList');
    var requiredMods = [];
    var requiredModsLoadError = '';

    function normalizeName(name) {
        return String(name).replace(/\\/g, '/').trim().toLowerCase();
    }

    function getBaseName(path) {
        var normalized = String(path).replace(/\\/g, '/');
        var parts = normalized.split('/');
        return parts[parts.length - 1];
    }

    function parseRequiredMods(text) {
        return text
            .split(/\r?\n/)
            .map(function (line) {
                return line.trim();
            })
            .filter(function (line) {
                return line.length > 0 && line.charAt(0) !== '#';
            });
    }

    fetch('required-mods.txt')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to load required-mods.txt');
            }
            return response.text();
        })
        .then(function (text) {
            requiredMods = parseRequiredMods(text);
            requiredModsLoadError = '';
            if (requiredSourceStatus) {
                requiredSourceStatus.textContent = 'Required list loaded: ' + requiredMods.length + ' file(s).';
            }
        })
        .catch(function () {
            requiredMods = [];
            requiredModsLoadError = 'Could not load required-mods.txt.';
            if (requiredSourceStatus) {
                requiredSourceStatus.textContent = requiredModsLoadError;
            }
        });

    uploadButton.addEventListener('click', function () {
        var folderInput = document.createElement('input');
        folderInput.type = 'file';
        folderInput.multiple = true;
        folderInput.setAttribute('webkitdirectory', '');
        folderInput.setAttribute('directory', '');

        folderInput.addEventListener('change', function () {
            if (!folderInput.files || folderInput.files.length === 0) {
                if (fileCount) {
                    fileCount.textContent = 'No folder selected.';
                }
                if (fileListContainer) {
                    fileListContainer.innerHTML = '';
                }
                if (missingCount) {
                    missingCount.textContent = 'Missing required files: none.';
                }
                if (missingListContainer) {
                    missingListContainer.innerHTML = '';
                }
                return;
            }

            var files = Array.from(folderInput.files)
                .map(function (file) {
                    return file.webkitRelativePath || file.name;
                })
                .sort();

            if (fileCount) {
                fileCount.textContent = 'Found ' + files.length + ' file(s).';
            }

            if (fileListContainer) {
                fileListContainer.innerHTML = '';

                var list = document.createElement('ul');
                list.className = 'cs-list';

                files.forEach(function (name) {
                    var item = document.createElement('li');
                    item.textContent = name;
                    list.appendChild(item);
                });

                fileListContainer.appendChild(list);
            }

            if (requiredModsLoadError) {
                if (missingCount) {
                    missingCount.textContent = requiredModsLoadError;
                }
                if (missingListContainer) {
                    missingListContainer.innerHTML = '';
                }
                return;
            }

            var uploadedLookup = new Set();
            files.forEach(function (path) {
                uploadedLookup.add(normalizeName(path));
                uploadedLookup.add(normalizeName(getBaseName(path)));
            });

            var missing = requiredMods.filter(function (requiredName) {
                return !uploadedLookup.has(normalizeName(requiredName));
            });

            if (missingCount) {
                missingCount.textContent = 'Missing required files: ' + missing.length;
            }

            if (missingListContainer) {
                missingListContainer.innerHTML = '';

                if (missing.length === 0) {
                    var done = document.createElement('p');
                    done.textContent = 'All required files are present.';
                    missingListContainer.appendChild(done);
                } else {
                    var missingList = document.createElement('ul');
                    missingList.className = 'cs-list';

                    missing.forEach(function (name) {
                        var item = document.createElement('li');
                        item.textContent = name;
                        missingList.appendChild(item);
                    });

                    missingListContainer.appendChild(missingList);
                }
            }
        });

        folderInput.click();
    });
});

const e = "Hello There ^.^",
n = ["color: #f92848;", "font-size: 24px;", "font-weight: bold;", "text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;"].join("");
console.log(`%c${e}`, n)
