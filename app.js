// التعامل مع نموذج المشروع
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على القيم من النموذج
    let projectName = document.getElementById('projectName').value;
    let projectCost = parseFloat(document.getElementById('projectCost').value);
    let projectSellValue = parseFloat(document.getElementById('projectSellValue').value);

    // حساب المكسب أو الخسارة
    let profitOrLoss = projectSellValue - projectCost;
    let profitOrLossStatus = profitOrLoss >= 0 ? 'مكسب' : 'خسارة';

    // إنشاء كائن مشروع جديد
    let project = {
        id: Date.now(),
        projectName: projectName,
        projectCost: projectCost,
        projectSellValue: projectSellValue,
        profitOrLoss: profitOrLoss.toFixed(2),
        profitOrLossStatus: profitOrLossStatus
    };

    // جلب المشاريع من Local Storage
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    // إضافة المشروع الجديد
    projects.push(project);

    // حفظ المشاريع في Local Storage
    localStorage.setItem('projects', JSON.stringify(projects));

    // إعادة ضبط النموذج
    document.getElementById('projectForm').reset();

    // تحديث عرض المشاريع
    displayProjects();
});

// دالة لعرض المشاريع في الجدول
function displayProjects() {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    let projectsTableBody = document.getElementById('projectsTable').querySelector('tbody');
    
    // تفريغ الجدول
    projectsTableBody.innerHTML = '';

    // إضافة المشاريع إلى الجدول
    projects.forEach(function(project) {
        let row = `<tr>
            <td>${project.projectName}</td>
            <td>${project.projectCost.toFixed(2)}</td>
            <td>${project.projectSellValue.toFixed(2)}</td>
            <td>${project.profitOrLoss} (${project.profitOrLossStatus})</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProject(${project.id})">حذف</button></td>
        </tr>`;
        projectsTableBody.innerHTML += row;
    });
}

// دالة لحذف مشروع
function deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
}

// عرض المشاريع عند تحميل الصفحة
window.onload = displayProjects;
