// Debug direct click handler
document.addEventListener('DOMContentLoaded', function() {
  // Direct click handler for testing
  document.body.addEventListener('click', function(e) {
    if (e.target.matches('.wallet-path-tag')) {
      console.log('Direct click on path tag:', {
        element: e.target,
        path: e.target.getAttribute('data-path'),
        pathName: e.target.getAttribute('data-path-name')
      });
    }
  });
});

// Wallet data loading and rendering logic
document.addEventListener('DOMContentLoaded', function() {
  console.log('Starting to fetch wallet data...');
  
  // Modal handling - set references to the existing global variables
  modal = document.getElementById('status-modal');
  modalTitle = document.getElementById('modal-title');
  modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');
  
  // Close modal when clicking the X
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-active');
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.classList.remove('modal-active');
    }
  });
  
  // Handle escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.classList.remove('modal-active');
    }
  });
  
  // Function to show status info in modal
  function showStatusInfo(emoji, meaning, title = 'Status Information') {
    // Get modal elements if not already initialized
    if (!modal) modal = document.getElementById('status-modal');
    if (!modalTitle) modalTitle = document.getElementById('modal-title');
    if (!modalBody) modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = title;
    
    let content = `
      <div class="modal-explanation">
        <table class="modal-table">
          <tr>
            <td class="emoji-cell">${emoji}</td>
            <td>${meaning}</td>
          </tr>
        </table>
      </div>
    `;
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.classList.add('modal-active');
  }
  
  // Delegate click events for status cells
  document.addEventListener('click', function(e) {
    const statusCell = e.target.closest('.status-cell[data-has-content="true"]');
    if (statusCell) {
      const emoji = statusCell.textContent.trim();
      const meaning = statusCell.getAttribute('aria-label');
      if (emoji && meaning) {
        showStatusInfo(emoji, meaning, `Status: ${emoji}`);
      }
    }
    
    // Handle clicks on rotated headers
    const rotatedHeader = e.target.closest('.rotated-header');
    if (rotatedHeader) {
      showAllStatusIcons();
    }
    
    // Handle clicks on path tags
    const pathTag = e.target.closest('.wallet-path-tag');
    if (pathTag) {
      const path = pathTag.getAttribute('data-path');
      const pathName = pathTag.getAttribute('data-path-name');
      
      // Get wallet name - find the wallet cell in the same row (more reliable than using column number)
      let walletNameElem = pathTag.closest('tr').querySelector('td a');
      const walletName = walletNameElem ? walletNameElem.textContent : 'Wallet';
      
      console.log("Path tag clicked:", { path, pathName, walletName });
      
      if (path && pathName) {
        showPathDetails(path, pathName, walletName);
      }
    }
  });
  
  // Function to show all status icons in the modal
  function showAllStatusIcons() {
    modalTitle.textContent = 'Status Icons Legend';
    
    let content = `
      <div class="modal-explanation">
        <table class="modal-table">
    `;
    
    // Get all icon definitions
    const iconMappings = [
      { icon: "✅", text: "Documented", meaning: "Documented + Link to doc" },
      { icon: "⚠️", text: "Unofficial", meaning: "Known, but unofficially documented" },
      { icon: "🛑", text: "Unknown", meaning: "Unknown. No obvious docs, research in progress" },
      { icon: "☠️", text: "Unavailable", meaning: "Not publicly available, or complex without a external tool available for the average user" },
      { icon: "😵", text: "Discontinued", meaning: "Discontinued and/or no longer maintained" },
      { icon: "🧐", text: "New Project", meaning: "New project and/or team" },
      { icon: "🚸", text: "Unsafe HW", meaning: "HW Physically unsafe with \"full secret\" (ie without BIP39 passphrase or multisig) against a automated attack and/or unsophisticated attacker (ie chipshouter blackbox)" },
      { icon: "👁", text: "Privacy", meaning: "Privacy concerns (default is third party node)" },
      { icon: "⑂", text: "Validation", meaning: "Validation concerns (default is third party node)" }
    ];
    
    iconMappings.forEach(icon => {
      content += `
        <tr>
          <td class="emoji-cell">${icon.icon}</td>
          <td>
            <strong>${icon.text}</strong>: ${icon.meaning}
          </td>
        </tr>
      `;
    });
    
    content += `
        </table>
      </div>
    `;
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.classList.add('modal-active');
  }
  
  fetch('wallets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(walletsData => {
      globalWalletsData = walletsData;
      renderWalletData(walletsData);
    })
    .catch(error => {
      console.error('Error loading wallet data:', error);
      document.getElementById('wallet-tables-container').innerHTML = 
        '<div class="error-box">Error loading wallet data: ' + error.message + '. Please try refreshing the page.</div>';
    });
  
  // Setup smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for navbar height
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Sticky Navbar Logic
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  // Handle mobile menu toggle
  navbarToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarToggle.classList.remove('active');
      navbarLinks.classList.remove('active');
    });
  });
  
  // Modified scrolling behavior to keep navbar always visible
  window.addEventListener('scroll', function() {
    // Update active section in navbar
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});

function renderWalletData(data) {
  // Get the container where we'll render the tables
  const container = document.getElementById('wallet-tables-container');
  if (!container) return;

  // Clear any existing content
  container.innerHTML = '';

  // Define icon mappings with short descriptive words in a more logical order
  const iconMappings = [
    { icon: "✅", text: "Documented", meaning: "Documented + Link to doc" },
    { icon: "⚠️", text: "Unofficial", meaning: "Known, but unofficially documented" },
    { icon: "🛑", text: "Unknown", meaning: "Unknown. No obvious docs, research in progress" },
    { icon: "☠️", text: "Unavailable", meaning: "Not publicly available, or complex without a external tool available for the average user" },
    { icon: "😵", text: "Discontinued", meaning: "Discontinued and/or no longer maintained" },
    { icon: "🧐", text: "New Project", meaning: "New project and/or team" },
    { icon: "🚸", text: "Unsafe HW", meaning: "HW Physically unsafe with \"full secret\" (ie without BIP39 passphrase or multisig) against a automated attack and/or unsophisticated attacker (ie chipshouter blackbox)" },
    { icon: "👁", text: "Privacy", meaning: "Privacy concerns (default is third party node)" },
    { icon: "⑂", text: "Validation", meaning: "Validation concerns (default is third party node)" }
  ];

  // Render each category
  data.categories.forEach(category => {
    // Create a section for the category
    const section = document.createElement('section');
    section.className = 'wallet-category';
    
    // Add a heading
    const heading = document.createElement('h3');
    heading.textContent = category.name;
    section.appendChild(heading);
    
    // Add count of wallets in this category
    const walletCount = document.createElement('p');
    walletCount.className = 'wallet-count';
    walletCount.textContent = `${category.wallets.length} wallets`;
    walletCount.style.color = '#666';
    walletCount.style.marginBottom = '15px';
    section.appendChild(walletCount);

    // Add search field
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = `Search ${category.name}...`;
    searchInput.setAttribute('data-category', category.name);
    searchContainer.appendChild(searchInput);
    
    // Add path filter buttons
    const pathFiltersDiv = document.createElement('div');
    pathFiltersDiv.className = 'path-filters';
    pathFiltersDiv.style.marginTop = '10px';
    pathFiltersDiv.style.marginBottom = '15px';
    
    const allPathsBtn = document.createElement('button');
    allPathsBtn.textContent = 'All';
    allPathsBtn.className = 'path-filter-btn active';
    allPathsBtn.onclick = () => filterTableByPath(table, 'all', pathFiltersDiv, noResults);
    pathFiltersDiv.appendChild(allPathsBtn);
    
    // Create buttons for common path types
    const pathTypes = [
      { id: 'bip44', text: 'Legacy (BIP44)' },
      { id: 'bip49', text: 'SegWit (BIP49)' },
      { id: 'bip84', text: 'Native SegWit (BIP84)' },
      { id: 'bip48', text: 'Multisig (BIP48)' },
      { id: 'bip86', text: 'Taproot (BIP86)' },
      { id: 'brd', text: 'BRD (m/0\')' }
    ];
    
    pathTypes.forEach(path => {
      const btn = document.createElement('button');
      btn.textContent = path.text;
      btn.className = 'path-filter-btn';
      btn.setAttribute('data-path', path.id);
      btn.onclick = () => filterTableByPath(table, path.id, pathFiltersDiv, noResults);
      pathFiltersDiv.appendChild(btn);
    });
    
    searchContainer.appendChild(pathFiltersDiv);
    section.appendChild(searchContainer);

    // Create a responsive wrapper for the table
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'wallet-table-wrapper';
    
    // Create the table
    const table = document.createElement('table');
    table.className = 'wallet-table';
    table.setAttribute('data-category', category.name);
    
    // Create the table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Add header cells for each icon type with rotated text
    iconMappings.forEach((iconType, index) => {
      const th = document.createElement('th');
      th.className = 'rotated-header';
      
      // Create a div for the rotated text
      const rotatedDiv = document.createElement('div');
      rotatedDiv.textContent = iconType.text;
      
      // Add the original icon as a data attribute for the ::after content
      th.setAttribute('data-icon', iconType.icon);
      
      // Add the meaning as an aria-label (removed tooltip)
      th.setAttribute('aria-label', `${iconType.text}: ${iconType.meaning}`);
      
      th.appendChild(rotatedDiv);
      th.setAttribute('data-column', index);
      th.addEventListener('click', () => sortTable(table, index));
      
      headerRow.appendChild(th);
    });
    
    // Add other headers based on the category
    let additionalHeaders;
    if (category.name === 'Lightning Wallets') {
      additionalHeaders = ['Wallet', 'Supported Paths', 'Pass', 'Notes'];
    } else if (category.name === 'Software Wallets') {
      additionalHeaders = ['Wallet', 'Supported Paths', 'BIP39', 'WIF', 'PSBT', 'Notes'];
    } else {
      additionalHeaders = ['Wallet', 'Supported Paths', 'BIP39', 'PSBT', 'Notes'];
    }
    
    // Create the remaining header cells
    additionalHeaders.forEach((headerText, index) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.setAttribute('data-column', index + iconMappings.length);
      th.addEventListener('click', () => sortTable(table, index + iconMappings.length));
      
      // Set width for specific columns
      if (headerText === 'Wallet') {
        th.style.minWidth = '150px';
      } else if (headerText === 'Supported Paths') {
        th.style.minWidth = '180px';
      } else if (headerText === 'BIP39' || headerText === 'WIF' || headerText === 'PSBT' || headerText === 'Pass') {
        th.style.minWidth = '80px';
        th.style.textAlign = 'center';
      } else if (headerText === 'Notes') {
        th.style.minWidth = '250px';
      }
      
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create the table body
    const tbody = document.createElement('tbody');
    
    // Add rows for each wallet in the category
    category.wallets.forEach(wallet => {
      const row = document.createElement('tr');
      
      // Add a cell for each icon type
      iconMappings.forEach(iconType => {
        const cell = document.createElement('td');
        cell.className = 'status-cell';
        cell.style.textAlign = 'center';
        
        // Check if this wallet's status includes this icon
        if (wallet.status.includes(iconType.icon)) {
          cell.textContent = iconType.icon;
          cell.setAttribute('aria-label', iconType.meaning);
          cell.setAttribute('data-has-content', 'true');
        } else {
          // Mark as empty - use a space but no tooltip
          cell.innerHTML = '&nbsp;'; 
          cell.setAttribute('data-empty', 'true');
          // Remove any title/tooltip for empty cells
          cell.removeAttribute('title');
          cell.removeAttribute('aria-label');
        }
        
        row.appendChild(cell);
      });
      
      // Wallet name cell with link
      const nameCell = document.createElement('td');
      const nameLink = document.createElement('a');
      nameLink.href = wallet.url;
      nameLink.textContent = wallet.name;
      nameLink.target = '_blank';
      nameCell.appendChild(nameLink);
      nameCell.style.fontWeight = '500';
      row.appendChild(nameCell);
      
      // Supported paths cell with improved display
      const pathsCell = document.createElement('td');
      pathsCell.className = 'wallet-paths';
      
      if (wallet.paths) {
        const pathContainer = document.createElement('ul');
        pathContainer.className = 'wallet-paths-container';
        pathContainer.style.listStyle = 'none';
        pathContainer.style.padding = '0';
        pathContainer.style.margin = '0';
        
        // Display supported paths as tags
        const pathMapping = {
          bip44: { path: "m/44'/0'/0'", name: "Legacy" },
          bip49: { path: "m/49'/0'/0'", name: "SegWit" },
          bip84: { path: "m/84'/0'/0'", name: "Native SegWit" },
          bip48: { path: "m/48'/0'/0'/2'", name: "Multisig" },
          bip86: { path: "m/86'/0'/0'", name: "Taproot" },
          brd: { path: "m/0'", name: "BRD" }
        };
        
        // First show standard paths
        Object.entries(pathMapping).forEach(([key, value]) => {
          if (wallet.paths[key]) {
            const tagItem = document.createElement('li');
            tagItem.style.display = 'inline-block';
            tagItem.style.marginBottom = '0';
            
            const tag = document.createElement('span');
            tag.className = 'wallet-path-tag active';
            tag.textContent = value.name;
            tag.setAttribute('aria-label', value.path);
            tag.setAttribute('data-path', value.path);
            tag.setAttribute('data-path-name', value.name);
            tagItem.appendChild(tag);
            pathContainer.appendChild(tagItem);
          }
        });
        
        // Then show custom paths if any
        if (wallet.paths.custom) {
          const tagItem = document.createElement('li');
          tagItem.style.display = 'inline-block';
          tagItem.style.marginBottom = '0';
          
          const tag = document.createElement('span');
          tag.className = 'wallet-path-tag custom';
          tag.textContent = 'Custom';
          tag.setAttribute('aria-label', wallet.paths.custom);
          tag.setAttribute('data-path', wallet.paths.custom);
          tag.setAttribute('data-path-name', 'Custom');
          tagItem.appendChild(tag);
          pathContainer.appendChild(tagItem);
        }
        
        pathsCell.appendChild(pathContainer);
      } else if (wallet.supported_paths) {
        // Fallback for old format
        pathsCell.textContent = wallet.supported_paths;
      } else {
        pathsCell.textContent = 'N/A';
      }
      
      row.appendChild(pathsCell);
      
      // BIP39 Pass/Passphrase cell with improved display
      const passCell = document.createElement('td');
      passCell.style.textAlign = 'center';
      let passValue;
      
      if (category.name === 'Lightning Wallets') {
        passValue = wallet.passphrase || 'N/A';
      } else {
        passValue = wallet.bip39_pass || 'N/A';
      }
      
      const passTag = document.createElement('span');
      passTag.className = `wallet-feature ${passValue.toLowerCase().replace(/\s+/g, '')}`;
      passTag.textContent = passValue;
      passCell.appendChild(passTag);
      row.appendChild(passCell);
      
      // Add WIF Support cell for Software Wallets with improved display
      if (category.name === 'Software Wallets') {
        const wifCell = document.createElement('td');
        wifCell.style.textAlign = 'center';
        const wifValue = wallet.wif_support || 'N/A';
        const wifTag = document.createElement('span');
        wifTag.className = `wallet-feature ${wifValue.toLowerCase().replace(/\s+/g, '')}`;
        wifTag.textContent = wifValue;
        wifCell.appendChild(wifTag);
        row.appendChild(wifCell);
      }
      
      // Add BIP174 PSBT cell for all except Lightning with improved display
      if (category.name !== 'Lightning Wallets') {
        const psbtCell = document.createElement('td');
        psbtCell.style.textAlign = 'center';
        const psbtValue = wallet.bip174_psbt || 'N/A';
        const psbtTag = document.createElement('span');
        psbtTag.className = `wallet-feature ${psbtValue.toLowerCase().replace(/\s+/g, '')}`;
        psbtTag.textContent = psbtValue;
        psbtCell.appendChild(psbtTag);
        row.appendChild(psbtCell);
      }
      
      // Notes cell with links
      const notesCell = document.createElement('td');
      notesCell.className = 'notes-cell';
      
      // Format the notes based on its type
      if (typeof wallet.notes === 'string') {
        // Legacy string format
        notesCell.innerHTML = formatNotes(wallet.notes);
      } else if (typeof wallet.notes === 'object') {
        // New structured format
        const formattedNotes = renderStructuredNotes(wallet.notes);
        notesCell.innerHTML = formattedNotes;
      }
      
      row.appendChild(notesCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    section.appendChild(tableWrapper);
    
    // Add no results message element (hidden by default)
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No matching wallets found.';
    noResults.style.display = 'none';
    section.appendChild(noResults);
    
    // Add swipe hint for mobile users
    const swipeHint = document.createElement('div');
    swipeHint.className = 'swipe-hint';
    swipeHint.textContent = '← Swipe to see all columns →';
    section.insertBefore(swipeHint, tableWrapper);
    
    container.appendChild(section);

    // Add search functionality
    searchInput.addEventListener('input', () => {
      const activePathFilter = pathFiltersDiv.querySelector('.path-filter-btn.active');
      const pathType = activePathFilter ? activePathFilter.getAttribute('data-path') || 'all' : 'all';
      
      // First filter by text search
      filterTable(table, searchInput.value.toLowerCase(), noResults);
      
      // Then apply path filtering if not "all"
      if (pathType !== 'all') {
        filterTableByPath(table, pathType, pathFiltersDiv, noResults);
      }
    });
  });

  // Add icon legend
  renderIconLegend(data.icons, container);
}

// Function to filter table rows based on search term
function filterTable(table, searchTerm, noResultsElement) {
  const tbody = table.querySelector('tbody');
  const rows = tbody.querySelectorAll('tr');
  let hasVisibleRows = false;
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let rowText = '';
    
    cells.forEach(cell => {
      rowText += ' ' + cell.textContent.toLowerCase();
    });
    
    if (rowText.includes(searchTerm)) {
      row.style.display = '';
      hasVisibleRows = true;
    } else {
      row.style.display = 'none';
    }
  });
  
  // Show "no results" message if needed
  if (noResultsElement) {
    noResultsElement.style.display = hasVisibleRows ? 'none' : 'block';
  }
}

// Function to filter table by derivation path
function filterTableByPath(table, pathType, filterContainer, noResultsElement) {
  // Update active button
  const buttons = filterContainer.querySelectorAll('.path-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if ((pathType === 'all' && btn.textContent === 'All') || 
        btn.getAttribute('data-path') === pathType) {
      btn.classList.add('active');
    }
  });
  
  const tbody = table.querySelector('tbody');
  const rows = tbody.querySelectorAll('tr');
  let visibleCount = 0;
  
  rows.forEach(row => {
    // If showing all, make all rows visible
    if (pathType === 'all') {
      row.style.display = '';
      visibleCount++;
      return;
    }
    
    // Get the wallet object for this row
    const walletName = row.querySelector('td:nth-child(2) a').textContent;
    const category = table.getAttribute('data-category');
    const wallet = findWalletInData(walletName, category);
    
    if (wallet && wallet.paths && wallet.paths[pathType]) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });
  
  // Show "no results" message if needed
  if (noResultsElement) {
    noResultsElement.style.display = visibleCount > 0 ? 'none' : 'block';
  }
  
  // Update wallet count
  const categorySection = table.closest('.wallet-category');
  const walletCountElem = categorySection.querySelector('.wallet-count');
  if (walletCountElem) {
    const totalWallets = rows.length;
    if (visibleCount === totalWallets) {
      walletCountElem.textContent = `${totalWallets} wallets`;
    } else {
      walletCountElem.textContent = `${visibleCount} of ${totalWallets} wallets`;
    }
  }
}

// Helper function to find a wallet in the data by name and category
let globalWalletsData = null;
function findWalletInData(name, categoryName) {
  if (!globalWalletsData) return null;
  
  const category = globalWalletsData.categories.find(cat => cat.name === categoryName);
  if (!category) return null;
  
  return category.wallets.find(wallet => wallet.name === name);
}

// Sort table by column
function sortTable(table, columnIndex) {
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const header = thead.querySelector(`th[data-column="${columnIndex}"]`);
  
  // Toggle sort direction
  const isAscending = !header.classList.contains('sort-asc');
  
  // Remove sort classes from all headers
  thead.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
  });
  
  // Add appropriate sort class to current header
  header.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
  
  // Sort the rows
  rows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll('td')[columnIndex];
    const cellB = rowB.querySelectorAll('td')[columnIndex];
    
    let valueA = cellA.textContent.trim();
    let valueB = cellB.textContent.trim();
    
    // Special handling for Status column (first column)
    if (columnIndex === 0) {
      return isAscending 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // For wallet name (second column), use the text of the link
    if (columnIndex === 1) {
      valueA = cellA.querySelector('a').textContent.trim();
      valueB = cellB.querySelector('a').textContent.trim();
    }
    
    // Compare as numbers if both values are numeric
    if (!isNaN(valueA) && !isNaN(valueB)) {
      return isAscending 
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }
    
    // Otherwise, compare as strings
    return isAscending 
      ? valueA.localeCompare(valueB) 
      : valueB.localeCompare(valueA);
  });
  
  // Reappend rows in sorted order
  rows.forEach(row => {
    tbody.appendChild(row);
  });
}

function getIconMeanings(icons, iconDefinitions) {
  let meanings = '';
  
  Array.from(icons).forEach(icon => {
    const definition = iconDefinitions.find(def => def.icon === icon);
    if (definition) {
      meanings += `${icon}: ${definition.meaning}\n`;
    }
  });
  
  return meanings;
}

function getStatusTooltip(status, icons) {
  return getIconMeanings(status, icons);
}

// Function to handle both old string-format notes and new structured notes
function formatNotes(notes) {
  // If notes is null or undefined, return empty string
  if (!notes) return '';
  
  // If notes is already a string (old format), process it with the icon replacements
  if (typeof notes === 'string') {
    // First handle explicit "Docs:" links
    let formattedNotes = notes.replace(/Docs: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Documentation: $1">📄</a>');
    
    // Then handle GitHub issues
    formattedNotes = formattedNotes.replace(/Github Issue: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="GitHub Issue: $1">🔍</a>');
    
    // Handle EXTERNAL RECOVERY NOT DOCUMENTED text
    formattedNotes = formattedNotes.replace(/EXTERNAL RECOVERY NOT DOCUMENTED/g, '<span class="notes-text" style="color: #e53e3e; font-weight: 500;">EXTERNAL RECOVERY NOT DOCUMENTED</span>');
    
    // Handle xPub links
    formattedNotes = formattedNotes.replace(/xPub: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="xPub Info: $1">🔑</a>');
    
    // Handle archive links
    formattedNotes = formattedNotes.replace(/Archive: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Archive: $1">📚</a>');
    
    // Handle recovery tool links
    formattedNotes = formattedNotes.replace(/Recovery [Tt]ool: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Recovery Tool: $1">🛠️</a>');
    
    // Handle integration guide links
    formattedNotes = formattedNotes.replace(/Integration Guide: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Integration Guide: $1">📋</a>');
    
    // Handle compatible wallets links
    formattedNotes = formattedNotes.replace(/Compatible Wallets: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Compatible Wallets: $1">🔗</a>');
    
    // Handle features links
    formattedNotes = formattedNotes.replace(/Features: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Features: $1">✨</a>');
    
    // Handle restore procedure links
    formattedNotes = formattedNotes.replace(/Restore procedure [A-Z]: (https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="Restore Procedure: $1">🔄</a>');
    
    // Handle any remaining links with generic icon
    formattedNotes = formattedNotes.replace(/(https?:\/\/[^\s,]+)/g, '<a href="$1" class="external-link-icon" target="_blank" rel="noopener" title="$1">🔗</a>');
    
    return formattedNotes;
  }
  
  // If notes is an object (new format), render it as icons
  if (typeof notes === 'object') {
    let result = '';
    
    // Documentation link
    if (notes.docs) {
      result += `<a href="${notes.docs}" class="external-link-icon" target="_blank" rel="noopener" title="Documentation: ${notes.docs}">📄</a>`;
    }
    
    // GitHub issue link
    if (notes.github_issue) {
      result += `<a href="${notes.github_issue}" class="external-link-icon" target="_blank" rel="noopener" title="GitHub Issue: ${notes.github_issue}">🔍</a>`;
    }
    
    // Recovery tool link
    if (notes.recovery_tool) {
      result += `<a href="${notes.recovery_tool}" class="external-link-icon" target="_blank" rel="noopener" title="Recovery Tool: ${notes.recovery_tool}">🛠️</a>`;
    }
    
    // xPub documentation
    if (notes.xpub) {
      result += `<a href="${notes.xpub}" class="external-link-icon" target="_blank" rel="noopener" title="xPub Info: ${notes.xpub}">🔑</a>`;
    }
    
    // Archive link
    if (notes.archive) {
      result += `<a href="${notes.archive}" class="external-link-icon" target="_blank" rel="noopener" title="Archive: ${notes.archive}">📚</a>`;
    }
    
    // Integration guide
    if (notes.integration_guide) {
      result += `<a href="${notes.integration_guide}" class="external-link-icon" target="_blank" rel="noopener" title="Integration Guide: ${notes.integration_guide}">📋</a>`;
    }
    
    // Compatible wallets
    if (notes.compatible_wallets) {
      result += `<a href="${notes.compatible_wallets}" class="external-link-icon" target="_blank" rel="noopener" title="Compatible Wallets: ${notes.compatible_wallets}">🔗</a>`;
    }
    
    // Features
    if (notes.features) {
      result += `<a href="${notes.features}" class="external-link-icon" target="_blank" rel="noopener" title="Features: ${notes.features}">✨</a>`;
    }
    
    // Restore procedures (can be an array)
    if (notes.restore_procedures) {
      if (Array.isArray(notes.restore_procedures)) {
        notes.restore_procedures.forEach((proc, index) => {
          result += `<a href="${proc}" class="external-link-icon" target="_blank" rel="noopener" title="Restore Procedure ${index + 1}: ${proc}">🔄</a>`;
        });
      } else {
        result += `<a href="${notes.restore_procedures}" class="external-link-icon" target="_blank" rel="noopener" title="Restore Procedure: ${notes.restore_procedures}">🔄</a>`;
      }
    }
    
    // Additional links (array of generic links)
    if (notes.links && Array.isArray(notes.links)) {
      notes.links.forEach(link => {
        result += `<a href="${link}" class="external-link-icon" target="_blank" rel="noopener" title="${link}">🔗</a>`;
      });
    }
    
    // Warning about external recovery
    if (notes.external_recovery_documented === false) {
      result += '<span class="notes-text" style="color: #e53e3e; font-weight: 500;">EXTERNAL RECOVERY NOT DOCUMENTED</span>';
    }
    
    // Other text notes
    if (notes.text) {
      result += `<span class="notes-text">${notes.text}</span>`;
    }
    
    return result;
  }
  
  return '';
}

function renderStructuredNotes(notes) {
  if (!notes) return '';
  
  let result = '';
  
  // Documentation link
  if (notes.docs) {
    result += `<a href="${notes.docs}" class="external-link-icon" target="_blank" rel="noopener" title="Documentation: ${notes.docs}">📄</a> `;
  }
  
  // GitHub issue link
  if (notes.github_issue) {
    result += `<a href="${notes.github_issue}" class="external-link-icon" target="_blank" rel="noopener" title="GitHub Issue: ${notes.github_issue}">🔍</a> `;
  }
  
  // Recovery tool link
  if (notes.recovery_tool) {
    result += `<a href="${notes.recovery_tool}" class="external-link-icon" target="_blank" rel="noopener" title="Recovery Tool: ${notes.recovery_tool}">🛠️</a> `;
  }
  
  // xPub documentation
  if (notes.xpub) {
    result += `<a href="${notes.xpub}" class="external-link-icon" target="_blank" rel="noopener" title="xPub Info: ${notes.xpub}">🔑</a> `;
  }
  
  // Archive link
  if (notes.archive) {
    result += `<a href="${notes.archive}" class="external-link-icon" target="_blank" rel="noopener" title="Archive: ${notes.archive}">📚</a> `;
  }
  
  // Integration guide
  if (notes.integration_guide) {
    result += `<a href="${notes.integration_guide}" class="external-link-icon" target="_blank" rel="noopener" title="Integration Guide: ${notes.integration_guide}">📋</a> `;
  }
  
  // Compatible wallets
  if (notes.compatible_wallets) {
    result += `<a href="${notes.compatible_wallets}" class="external-link-icon" target="_blank" rel="noopener" title="Compatible Wallets: ${notes.compatible_wallets}">🔗</a> `;
  }
  
  // Features
  if (notes.features) {
    result += `<a href="${notes.features}" class="external-link-icon" target="_blank" rel="noopener" title="Features: ${notes.features}">✨</a> `;
  }
  
  // Restore procedures (can be an array)
  if (notes.restore_procedures) {
    if (Array.isArray(notes.restore_procedures)) {
      notes.restore_procedures.forEach((proc, index) => {
        result += `<a href="${proc}" class="external-link-icon" target="_blank" rel="noopener" title="Restore Procedure ${index + 1}: ${proc}">🔄</a> `;
      });
    } else {
      result += `<a href="${notes.restore_procedures}" class="external-link-icon" target="_blank" rel="noopener" title="Restore Procedure: ${notes.restore_procedures}">🔄</a> `;
    }
  }
  
  // Additional links (array of generic links)
  if (notes.links && Array.isArray(notes.links)) {
    notes.links.forEach(link => {
      result += `<a href="${link}" class="external-link-icon" target="_blank" rel="noopener" title="${link}">🔗</a> `;
    });
  }
  
  // Warning about external recovery
  if (notes.external_recovery_documented === false) {
    result += '<span class="notes-text" style="color: #e53e3e; font-weight: 500;">EXTERNAL RECOVERY NOT DOCUMENTED</span> ';
  }
  
  // Other text notes
  if (notes.text) {
    result += `<span class="notes-text">${notes.text}</span>`;
  }
  
  return result;
}

function renderIconLegend(icons, container) {
  const legendSection = document.createElement('section');
  legendSection.className = 'icon-legend';
  
  const legendHeading = document.createElement('h3');
  legendHeading.textContent = 'Icon Legend';
  legendSection.appendChild(legendHeading);
  
  const legendTable = document.createElement('table');
  legendTable.className = 'legend-table';
  
  const legendThead = document.createElement('thead');
  const legendHeaderRow = document.createElement('tr');
  
  const iconHeader = document.createElement('th');
  iconHeader.textContent = 'Icon';
  iconHeader.style.width = '70px';
  legendHeaderRow.appendChild(iconHeader);
  
  const meaningHeader = document.createElement('th');
  meaningHeader.textContent = 'Meaning';
  legendHeaderRow.appendChild(meaningHeader);
  
  legendThead.appendChild(legendHeaderRow);
  legendTable.appendChild(legendThead);
  
  const legendTbody = document.createElement('tbody');
  
  icons.forEach(icon => {
    const row = document.createElement('tr');
    
    const iconCell = document.createElement('td');
    iconCell.textContent = icon.icon;
    iconCell.style.fontSize = '1.2em';
    iconCell.style.textAlign = 'center';
    row.appendChild(iconCell);
    
    const meaningCell = document.createElement('td');
    meaningCell.textContent = icon.meaning;
    row.appendChild(meaningCell);
    
    legendTbody.appendChild(row);
  });
  
  legendTable.appendChild(legendTbody);
  legendSection.appendChild(legendTable);
  container.appendChild(legendSection);
  
  // Add a back to top button
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑ Back to top';
  backToTop.style.textAlign = 'right';
  backToTop.style.margin = '30px 0';
  backToTop.style.cursor = 'pointer';
  backToTop.style.color = 'var(--primary-color)';
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  container.appendChild(backToTop);
}

// Global modal elements
let modal, modalTitle, modalBody;

// Initialize modal references
document.addEventListener('DOMContentLoaded', function() {
  modal = document.getElementById('status-modal');
  modalTitle = document.getElementById('modal-title');
  modalBody = document.getElementById('modal-body');
});

// Function to show path details in modal
function showPathDetails(path, pathName, walletName) {
  // Get modal elements if not already initialized
  if (!modal) modal = document.getElementById('status-modal');
  if (!modalTitle) modalTitle = document.getElementById('modal-title');
  if (!modalBody) modalBody = document.getElementById('modal-body');
  
  modalTitle.textContent = `${pathName} Derivation Path`;
  
  // Parse the path into components
  let pathComponents = [];
  let explanation = '';
  
  if (path === "m/0'") {
    // Handle BRD path
    pathComponents = [
      { label: "Master key", value: "m", explanation: "Master HD node derived from seed" },
      { label: "Account", value: "0'", explanation: "First hardened account" }
    ];
    explanation = "BRD uses a non-standard, shorter derivation path that only specifies the hardened account index.";
  } else if (path.startsWith("m/")) {
    // Handle standard paths
    const components = path.substring(2).split('/');
    
    // Add master key
    pathComponents.push({ 
      label: "Master key", 
      value: "m", 
      explanation: "Master HD node derived from seed" 
    });
    
    if (path.startsWith("m/44'")) {
      // BIP44 legacy
      if (components.length > 0) pathComponents.push({ 
        label: "Purpose", 
        value: components[0], 
        explanation: "BIP44 Legacy" 
      });
      if (components.length > 1) pathComponents.push({ 
        label: "Coin Type", 
        value: components[1], 
        explanation: "0' for Bitcoin mainnet" 
      });
      if (components.length > 2) pathComponents.push({ 
        label: "Account", 
        value: components[2], 
        explanation: "Account index (hardened)" 
      });
      if (components.length > 3) pathComponents.push({ 
        label: "Change", 
        value: components[3], 
        explanation: "External (0) or internal/change (1)" 
      });
      if (components.length > 4) pathComponents.push({ 
        label: "Address Index", 
        value: components[4], 
        explanation: "Address index within the chain" 
      });
      
      explanation = "BIP44 defines the legacy address format using P2PKH (addresses starting with '1').";
    } else if (path.startsWith("m/49'")) {
      // BIP49 SegWit
      if (components.length > 0) pathComponents.push({ 
        label: "Purpose", 
        value: components[0], 
        explanation: "BIP49 Nested SegWit" 
      });
      if (components.length > 1) pathComponents.push({ 
        label: "Coin Type", 
        value: components[1], 
        explanation: "0' for Bitcoin mainnet" 
      });
      if (components.length > 2) pathComponents.push({ 
        label: "Account", 
        value: components[2], 
        explanation: "Account index (hardened)" 
      });
      if (components.length > 3) pathComponents.push({ 
        label: "Change", 
        value: components[3], 
        explanation: "External (0) or internal/change (1)" 
      });
      if (components.length > 4) pathComponents.push({ 
        label: "Address Index", 
        value: components[4], 
        explanation: "Address index within the chain" 
      });
      
      explanation = "BIP49 defines nested SegWit addresses (P2WPKH-in-P2SH, addresses starting with '3').";
    } else if (path.startsWith("m/84'")) {
      // BIP84 Native SegWit
      if (components.length > 0) pathComponents.push({ 
        label: "Purpose", 
        value: components[0], 
        explanation: "BIP84 Native SegWit" 
      });
      if (components.length > 1) pathComponents.push({ 
        label: "Coin Type", 
        value: components[1], 
        explanation: "0' for Bitcoin mainnet" 
      });
      if (components.length > 2) pathComponents.push({ 
        label: "Account", 
        value: components[2], 
        explanation: "Account index (hardened)" 
      });
      if (components.length > 3) pathComponents.push({ 
        label: "Change", 
        value: components[3], 
        explanation: "External (0) or internal/change (1)" 
      });
      if (components.length > 4) pathComponents.push({ 
        label: "Address Index", 
        value: components[4], 
        explanation: "Address index within the chain" 
      });
      
      explanation = "BIP84 defines native SegWit addresses (P2WPKH, addresses starting with 'bc1').";
    } else if (path.startsWith("m/86'")) {
      // BIP86 Taproot
      if (components.length > 0) pathComponents.push({ 
        label: "Purpose", 
        value: components[0], 
        explanation: "BIP86 Taproot" 
      });
      if (components.length > 1) pathComponents.push({ 
        label: "Coin Type", 
        value: components[1], 
        explanation: "0' for Bitcoin mainnet" 
      });
      if (components.length > 2) pathComponents.push({ 
        label: "Account", 
        value: components[2], 
        explanation: "Account index (hardened)" 
      });
      if (components.length > 3) pathComponents.push({ 
        label: "Change", 
        value: components[3], 
        explanation: "External (0) or internal/change (1)" 
      });
      if (components.length > 4) pathComponents.push({ 
        label: "Address Index", 
        value: components[4], 
        explanation: "Address index within the chain" 
      });
      
      explanation = "BIP86 defines Taproot addresses (P2TR, addresses also starting with 'bc1' but using different witness version).";
    } else if (path.startsWith("m/48'")) {
      // BIP48 Multisig
      if (components.length > 0) pathComponents.push({ 
        label: "Purpose", 
        value: components[0], 
        explanation: "BIP48 Multisig" 
      });
      if (components.length > 1) pathComponents.push({ 
        label: "Coin Type", 
        value: components[1], 
        explanation: "0' for Bitcoin mainnet" 
      });
      if (components.length > 2) pathComponents.push({ 
        label: "Account", 
        value: components[2], 
        explanation: "Account index (hardened)" 
      });
      if (components.length > 3) pathComponents.push({ 
        label: "Script Type", 
        value: components[3], 
        explanation: "Script type: 1' for P2SH, 2' for P2WSH-P2SH, 3' for P2WSH" 
      });
      if (components.length > 4) pathComponents.push({ 
        label: "Change", 
        value: components[4], 
        explanation: "External (0) or internal/change (1)" 
      });
      if (components.length > 5) pathComponents.push({ 
        label: "Address Index", 
        value: components[5], 
        explanation: "Address index within the chain" 
      });
      
      explanation = "BIP48 defines paths for multisignature scripts with different formats.";
    } else {
      // Generic path parsing
      components.forEach((component, index) => {
        let label = '';
        let explain = '';
        
        switch(index) {
          case 0:
            label = "Purpose";
            explain = "Purpose field";
            break;
          case 1:
            label = "Coin Type";
            explain = component === "0'" ? "Bitcoin mainnet" : "Coin type";
            break;
          case 2:
            label = "Account";
            explain = "Account index";
            break;
          case 3:
            label = "Change/Script";
            explain = "Change or script type";
            break;
          case 4:
            label = "Address Index";
            explain = "Address index";
            break;
          default:
            label = `Level ${index+1}`;
            explain = "Additional path level";
        }
        
        pathComponents.push({
          label: label,
          value: component,
          explanation: explain
        });
      });
      
      explanation = "Custom derivation path.";
    }
  } else {
    // Unrecognized format
    pathComponents.push({
      label: "Full Path",
      value: path,
      explanation: "Custom/non-standard derivation path"
    });
    
    explanation = "This appears to be a custom or non-standard derivation path format.";
  }
  
  // Build the modal content
  let content = `
    <div class="modal-explanation">
      <p><strong>Used by:</strong> ${walletName}</p>
      <p><strong>Full Path:</strong> <code class="path-code">${path}</code></p>
      
      <h4>Path Components</h4>
      <table class="modal-table">
        <tr>
          <th>Component</th>
          <th>Value</th>
          <th>Explanation</th>
        </tr>
  `;
  
  pathComponents.forEach(component => {
    content += `
      <tr>
        <td><strong>${component.label}</strong></td>
        <td><code>${component.value}</code></td>
        <td>${component.explanation}</td>
      </tr>
    `;
  });
  
  content += `
      </table>
      
      <div class="path-explanation">
        <h4>About ${pathName} Paths</h4>
        <p>${explanation}</p>
      </div>
    </div>
  `;
  
  modalBody.innerHTML = content;
  modal.style.display = 'block';
  document.body.classList.add('modal-active');
} 