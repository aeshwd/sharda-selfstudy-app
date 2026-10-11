function renderNavigation() {
    const navContainer = document.getElementById('bottom-nav-links');
    navContainer.innerHTML = '';

    const role = currentProfile.role;
    let links = [];

    if (role === 'admin') {
        links = [
            { id: 'admin-dash', label: 'Home', icon: '📊' },
            { id: 'admin-students', label: 'Students', icon: '🎓' },
            { id: 'admin-tests', label: 'Tests', icon: '📝' },
            { id: 'admin-attendance', label: 'Attendance', icon: '📅' },
            { id: 'admin-approvals', label: 'Approvals', icon: '⏳' }
        ];
    } else {
        links = [
            { id: 'student-dash', label: 'Home', icon: '🏠' },
            { id: 'student-tests', label: 'Results', icon: '📊' },
            { id: 'student-attendance', label: 'Attendance', icon: '📅' },
            { id: 'student-profile', label: 'Profile', icon: '⚙️' }
        ];
    }

    links.forEach((link, idx) => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = `app-nav-item ${idx === 0 ? 'active' : ''}`;
        a.innerHTML = `<span>${link.icon}</span><span>${link.label}</span>`;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.app-nav-item').forEach(el => el.classList.remove('active'));
            a.classList.add('active');
            document.getElementById('app-screen-title').textContent = link.label;
            switchView(link.id);
        });
        navContainer.appendChild(a);
    });

    // Update Topbar Avatar and Greeting
    document.getElementById('app-user-greeting').textContent = currentProfile.full_name || 'User';
    const topAvatar = document.getElementById('topbar-avatar');
    if (currentProfile.avatar_path) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(currentProfile.avatar_path);
        topAvatar.innerHTML = `<img src="${data.publicUrl}" alt="Avatar">`;
    } else {
        const initials = currentProfile.full_name ? currentProfile.full_name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'SS';
        topAvatar.textContent = initials;
    }

    document.getElementById('logout-btn-top').onclick = async () => {
        await supabase.auth.signOut();
        currentUser = null;
        currentProfile = null;
        showAuthView();
        showToast('Logged out successfully', 'success');
    };
}