// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

// Check for saved dark mode preference
function initDarkMode() {
    var darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        updateDarkModeIcon(false);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    updateDarkModeIcon(isDark);
    return false;
}

// Update dark mode icon
function updateDarkModeIcon(isDark) {
    // Update all dark mode icons on the page
    var icons = document.querySelectorAll('#darkModeIcon');
    icons.forEach(function(icon) {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Initialize dark mode on page load
function setupDarkModeToggle() {
    // Use event delegation for all dark mode toggle buttons
    $(document).on('click', '.dark-mode-toggle, #darkModeToggle', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkMode();
        return false;
    });
}

// Initialize when DOM is ready
$(document).ready(function() {
    initDarkMode();
    setupDarkModeToggle();
});

// Also add vanilla JS event listener as fallback (works even if jQuery fails)
window.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    
    // Add click listeners to all dark mode toggles
    var toggles = document.querySelectorAll('.dark-mode-toggle, #darkModeToggle');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDarkMode();
        });
    });
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

// Sticky Navbar on Scroll
$(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
        $('#navbar').addClass('scrolled');
    } else {
        $('#navbar').removeClass('scrolled');
    }
});

// Mobile Menu Toggle
$('#navToggle').click(function() {
    $('#navMenu').toggleClass('active');
    $(this).toggleClass('active');
});

// Close mobile menu when clicking on a link
$('.nav-menu a').click(function() {
    if ($(window).width() <= 768) {
        $('#navMenu').removeClass('active');
        $('#navToggle').removeClass('active');
    }
});

// Smooth Scrolling
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 1000);
    }
});

// ============================================
// FORM VALIDATION
// ============================================

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showError(input, message) {
    input.classList.add('error');
    var errorDiv = input.parentElement.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearError(input) {
    input.classList.remove('error');
    var errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Login Form Validation
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('loginEmail');
        var password = document.getElementById('loginPassword');
        var isValid = true;

        clearError(email);
        clearError(password);

        if (!email.value || !validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!password.value || password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            alert('Login successful! Redirecting...');
            window.location.href = 'dashboard.html';
        }
    });
}

// Signup Form Validation
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('signupName');
        var email = document.getElementById('signupEmail');
        var phone = document.getElementById('signupPhone');
        var password = document.getElementById('signupPassword');
        var confirmPassword = document.getElementById('confirmPassword');
        var isValid = true;

        clearError(name);
        clearError(email);
        clearError(phone);
        clearError(password);
        clearError(confirmPassword);

        if (!name.value || name.value.length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email.value || !validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!phone.value || !validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        if (!password.value || password.value.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            isValid = false;
        }

        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            alert('Signup successful! Redirecting to login...');
            window.location.href = 'login.html';
        }
    });
}

// Contact Form Validation
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('contactName');
        var email = document.getElementById('contactEmail');
        var message = document.getElementById('contactMessage');
        var isValid = true;

        clearError(name);
        clearError(email);
        clearError(message);

        if (!name.value || name.value.length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!email.value || !validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (!message.value || message.value.length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            document.getElementById('contactForm').reset();
        }
    });
}

// ============================================
// CAR FILTERING (AJAX)
// ============================================

// Sample car data (in real app, this would come from an API)
var carData = [
    { id: 1, make: 'BMW', model: '3 Series', year: 2020, price: 28500, fuel: 'Petrol', mileage: 15000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80' },
    { id: 2, make: 'Mercedes', model: 'C-Class', year: 2019, price: 32000, fuel: 'Diesel', mileage: 20000, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80' },
    { id: 3, make: 'Audi', model: 'A4', year: 2021, price: 35000, fuel: 'Petrol', mileage: 12000, image: 'https://images.unsplash.com/photo-1606664515524-ed4f68c9c92a?w=800&q=80' },
    { id: 4, make: 'Tesla', model: 'Model 3', year: 2022, price: 42000, fuel: 'Electric', mileage: 8000, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80' },
    { id: 5, make: 'Toyota', model: 'Camry', year: 2020, price: 22000, fuel: 'Petrol', mileage: 25000, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80' },
    { id: 6, make: 'Honda', model: 'Accord', year: 2019, price: 24000, fuel: 'Petrol', mileage: 30000, image: 'https://images.unsplash.com/photo-1606664515524-ed4f68c9c92a?w=800&q=80' },
    { id: 7, make: 'Ford', model: 'Mustang', year: 2021, price: 38000, fuel: 'Petrol', mileage: 10000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' },
    { id: 8, make: 'Volkswagen', model: 'Passat', year: 2020, price: 26000, fuel: 'Diesel', mileage: 18000, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80' }
];

function filterCars() {
    var make = $('#filterMake').val();
    var fuel = $('#filterFuel').val();
    var minPrice = $('#filterMinPrice').val() || 0;
    var maxPrice = $('#filterMaxPrice').val() || 999999;
    var minYear = $('#filterMinYear').val() || 2010;
    var maxYear = $('#filterMaxYear').val() || 2025;

    // Simulate AJAX call
    $('#loadingIndicator').show();
    
    setTimeout(function() {
        var filtered = carData.filter(function(car) {
            return (!make || car.make === make) &&
                   (!fuel || car.fuel === fuel) &&
                   car.price >= minPrice && car.price <= maxPrice &&
                   car.year >= minYear && car.year <= maxYear;
        });

        displayCars(filtered);
        $('#loadingIndicator').hide();
    }, 500);
}

function displayCars(cars) {
    var container = $('#carsContainer');
    if (cars.length === 0) {
        container.html('<div class="no-results"><h3>No cars found matching your criteria</h3><p>Try adjusting your filters</p></div>');
        return;
    }

    var html = '';
    cars.forEach(function(car) {
        html += `
            <div class="car-card">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.make} ${car.model}">
                </div>
                <div class="car-info">
                    <h3>${car.make} ${car.model}</h3>
                    <p class="car-specs">${car.year} • ${car.mileage.toLocaleString()} km • ${car.fuel}</p>
                    <div class="car-price">$${car.price.toLocaleString()}</div>
                    <div class="car-actions">
                        <a href="details.html?id=${car.id}" class="btn btn-outline">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });

    container.html(html);
}

// Initialize filters
$(document).ready(function() {
    if ($('#filterMake').length) {
        // Populate make filter
        var makes = [...new Set(carData.map(car => car.make))];
        makes.forEach(function(make) {
            $('#filterMake').append(`<option value="${make}">${make}</option>`);
        });

        // Initialize display
        displayCars(carData);

        // Filter event listeners
        $('#filterMake, #filterFuel, #filterMinPrice, #filterMaxPrice, #filterMinYear, #filterMaxYear').on('change', filterCars);
    }
});

// ============================================
// COMPARE CARS FUNCTIONALITY
// ============================================

function addToCompare(carId) {
    var compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (compareList.length >= 3) {
        alert('You can compare up to 3 cars at a time');
        return;
    }
    if (compareList.indexOf(carId) === -1) {
        compareList.push(carId);
        localStorage.setItem('compareList', JSON.stringify(compareList));
        updateCompareBadge();
        alert('Car added to compare');
    } else {
        alert('Car already in compare list');
    }
}

function removeFromCompare(carId) {
    var compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    compareList = compareList.filter(id => id !== carId);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareBadge();
    if ($('#compareContainer').length) {
        loadCompareCars();
    }
}

function updateCompareBadge() {
    var compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    $('.compare-badge').text(compareList.length);
}

function loadCompareCars() {
    var compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (compareList.length === 0) {
        $('#compareContainer').html('<div class="no-results"><h3>No cars to compare</h3><p>Add cars from the listing page to compare</p></div>');
        $('#comparisonTable').hide();
        return;
    }

    var cars = carData.filter(car => compareList.indexOf(car.id) !== -1);
    var html = '<div class="compare-grid">';
    cars.forEach(function(car, index) {
        html += `
            <div class="compare-card">
                <button class="remove-compare" onclick="removeFromCompare(${car.id})"><i class="fas fa-times"></i></button>
                <div class="compare-image">
                    <img src="${car.image}" alt="${car.make} ${car.model}">
                </div>
                <h3>${car.make} ${car.model}</h3>
                <div class="compare-specs">
                    <div class="spec-item">
                        <span class="spec-label">Year:</span>
                        <span class="spec-value">${car.year}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Price:</span>
                        <span class="spec-value">$${car.price.toLocaleString()}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Fuel:</span>
                        <span class="spec-value">${car.fuel}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Mileage:</span>
                        <span class="spec-value">${car.mileage.toLocaleString()} km</span>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    $('#compareContainer').html(html);
    
    // Populate comparison table
    if (cars.length > 0) {
        populateComparisonTable(cars);
    }
}

function populateComparisonTable(cars) {
    $('#comparisonTable').show();
    
    // Set table headers
    cars.forEach(function(car, index) {
        $('#tableCar' + (index + 1)).text(car.make + ' ' + car.model);
    });
    
    // Clear empty columns
    for (var i = cars.length + 1; i <= 3; i++) {
        $('#tableCar' + i).text('-');
    }
    
    // Populate table body
    var tableBody = '';
    var specs = [
        { label: 'Year', getValue: (car) => car.year },
        { label: 'Price', getValue: (car) => '$' + car.price.toLocaleString() },
        { label: 'Fuel Type', getValue: (car) => car.fuel },
        { label: 'Mileage', getValue: (car) => car.mileage.toLocaleString() + ' km' },
        { label: 'Transmission', getValue: (car) => 'Automatic' },
        { label: 'Engine', getValue: (car) => '2.0L' },
        { label: 'Seating', getValue: (car) => '5 Seats' },
        { label: 'Color', getValue: (car) => 'Black' }
    ];
    
    specs.forEach(function(spec) {
        tableBody += '<tr>';
        tableBody += '<td><strong>' + spec.label + '</strong></td>';
        cars.forEach(function(car) {
            tableBody += '<td>' + spec.getValue(car) + '</td>';
        });
        // Fill empty columns
        for (var i = cars.length; i < 3; i++) {
            tableBody += '<td>-</td>';
        }
        tableBody += '</tr>';
    });
    
    $('#comparisonTableBody').html(tableBody);
}

// Initialize compare badge on page load
$(document).ready(function() {
    updateCompareBadge();
    if ($('#compareContainer').length) {
        loadCompareCars();
    }
});

// ============================================
// DASHBOARD MOBILE MENU TOGGLE
// ============================================

// Dashboard sidebar toggle for mobile/tablet
$('#dashboardMenuToggle').click(function() {
    $('#dashboardSidebar').toggleClass('active');
    $('#sidebarOverlay').toggleClass('active');
});

// Close sidebar when clicking overlay
$('#sidebarOverlay').click(function() {
    $('#dashboardSidebar').removeClass('active');
    $('#sidebarOverlay').removeClass('active');
});

// Close sidebar when clicking a menu item on mobile
$('.sidebar-menu a').click(function() {
    if ($(window).width() <= 1024) {
        $('#dashboardSidebar').removeClass('active');
        $('#sidebarOverlay').removeClass('active');
    }
});
