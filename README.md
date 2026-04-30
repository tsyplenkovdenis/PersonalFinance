<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Финансовая аналитика</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            font-size: 28px;
        }

        /* ===== UPLOAD SECTION ===== */
        .upload-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        .file-input-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
        }

        .file-input-wrapper input[type="file"] {
            position: absolute;
            left: -9999px;
        }

        .file-input-label {
            display: inline-block;
            padding: 10px 20px;
            background: #667eea;
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .file-input-label:hover {
            background: #5568d3;
        }

        .file-name {
            color: #666;
            font-size: 14px;
        }

        button {
            padding: 10px 25px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s;
        }

        button:hover {
            background: #45a049;
        }

        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }

        .message {
            padding: 12px 20px;
            border-radius: 4px;
            font-weight: bold;
        }

        .success {
            background: #d4edda;
            color: #155724;
        }

        .error {
            background: #f8d7da;
            color: #721c24;
        }

        /* ===== FILTERS SECTION ===== */
        .filters-section {
            background: #f0f2f5;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            display: flex;
            gap: 20px;
            align-items: center;
            flex-wrap: wrap;
        }

        .filter-group {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .filter-group label {
            font-weight: bold;
            color: #333;
        }

        .filter-group select {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            background: white;
            cursor: pointer;
        }

        /* ===== METRICS SECTION ===== */
        .metrics-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .metric-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .metric-card.income {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        }

        .metric-card.expense {
            background: linear-gradient(135deg, #f44336 0%, #da190b 100%);
        }

        .metric-card.balance {
            background: linear-gradient(135deg, #2196F3 0%, #0b7dda 100%);
        }

        .metric-label {
            font-size: 12px;
            opacity: 0.9;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .metric-value {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .metric-change {
            font-size: 12px;
            opacity: 0.85;
        }

        .metric-change.positive {
            color: #a8f5a8;
        }

        .metric-change.negative {
            color: #ffa8a8;
        }

        /* ===== CHARTS SECTION ===== */
        .charts-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
        }

        .chart-container {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .chart-container h3 {
            margin-bottom: 15px;
            color: #333;
            text-align: center;
        }

        .chart-wrapper {
            position: relative;
            height: 300px;
        }

        /* ===== FULL YEAR TABLE ===== */
        .table-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .table-section h3 {
            margin-bottom: 15px;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        thead {
            background: #e9ecef;
        }

        th {
            padding: 12px;
            text-align: left;
            font-weight: bold;
            color: #333;
            border-bottom: 2px solid #ddd;
        }

        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
            color: #666;
        }

        tr:hover {
            background: #f8f9fa;
        }

        .income-text {
            color: #4CAF50;
            font-weight: bold;
        }

        .expense-text {
            color: #f44336;
            font-weight: bold;
        }

        .balance-text {
            font-weight: bold;
        }

        .balance-text.positive {
            color: #4CAF50;
        }

        .balance-text.negative {
            color: #f44336;
        }

        /* ===== MONTHLY CHART ===== */
        .monthly-chart-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .monthly-chart-section h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .chart-wrapper-large {
            position: relative;
            height: 400px;
        }

        .hidden {
            display: none;
        }

        .loading {
            text-align: center;
            padding: 20px;
            color: #666;
        }

        @media (max-width: 768px) {
            .charts-section {
                grid-template-columns: 1fr;
            }

            .metrics-section {
                grid-template-columns: 1fr;
            }

            .upload-section {
                flex-direction: column;
                align-items: flex-start;
            }

            .filters-section {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Личная финансовая аналитика</h1>

        <!-- UPLOAD SECTION -->
        <div class="upload-section">
            <div class="file-input-wrapper">
                <label class="file-input-label" for="excelFile">📁 Выбрать Excel файл</label>
                <input type="file" id="excelFile" accept=".xlsx, .xls">
            </div>
            <span class="file-name" id="fileName">Файл не выбран</span>
            <button onclick="loadAndParseExcel()">Загрузить</button>
            <div id="message"></div>
        </div>

        <!-- FILTERS SECTION -->
        <div class="filters-section hidden" id="filtersSection">
            <div class="filter-group">
                <label for="yearSelect">Год:</label>
                <select id="yearSelect" onchange="updateDashboard()">
                    <option value="">Все годы</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="monthSelect">Месяц:</label>
                <select id="monthSelect" onchange="updateDashboard()">
                    <option value="">Все месяцы</option>
                    <option value="1">Январь</option>
                    <option value="2">Февраль</option>
                    <option value="3">Март</option>
                    <option value="4">Апрель</option>
                    <option value="5">Май</option>
                    <option value="6">Июнь</option>
                    <option value="7">Июль</option>
                    <option value="8">Август</option>
                    <option value="9">Сентябрь</option>
                    <option value="10">Октябрь</option>
                    <option value="11">Ноябрь</option>
                    <option value="12">Декабрь</option>
                </select>
            </div>
        </div>

        <!-- METRICS SECTION -->
        <div class="metrics-section hidden" id="metricsSection">
            <div class="metric-card balance">
                <div class="metric-label">Доход за период</div>
                <div class="metric-value" id="incomeMetric">0 ₽</div>
                <div class="metric-change" id="incomeChange"></div>
            </div>
            <div class="metric-card expense">
                <div class="metric-label">Расход за период</div>
                <div class="metric-value" id="expenseMetric">0 ₽</div>
                <div class="metric-change" id="expenseChange"></div>
            </div>
            <div class="metric-card">
                <div class="metric-label">Баланс (Доход - Расход)</div>
                <div class="metric-value" id="balanceMetric">0 ₽</div>
                <div class="metric-change" id="balanceChange"></div>
            </div>
        </div>

        <!-- CHARTS SECTION -->
        <div class="charts-section hidden" id="chartsSection">
            <div class="chart-container">
                <h3>📈 Доходы по категориям</h3>
                <div class="chart-wrapper">
                    <canvas id="incomeChart"></canvas>
                </div>
            </div>
            <div class="chart-container">
                <h3>📉 Расходы по категориям</h3>
                <div class="chart-wrapper">
                    <canvas id="expenseChart"></canvas>
                </div>
            </div>
        </div>

        <!-- MONTHLY CHART -->
        <div class="monthly-chart-section hidden" id="monthlyChartSection">
            <h3>📅 Динамика доходов и расходов по месяцам</h3>
            <div class="chart-wrapper-large">
                <canvas id="monthlyChart"></canvas>
            </div>
        </div>

        <!-- FULL YEAR TABLE -->
        <div class="table-section hidden" id="tableSection">
            <h3>📋 Сводка по годам</h3>
            <table>
                <thead>
                    <tr>
                        <th>Год</th>
                        <th class="income-text">Общий доход</th>
                        <th class="expense-text">Общие расходы</th>
                        <th>Баланс</th>
                    </tr>
                </thead>
                <tbody id="yearlyTableBody">
                </tbody>
            </table>
        </div>
    </div>

    <script>
        let allData = [];
        let incomeChartInstance = null;
        let expenseChartInstance = null;
        let monthlyChartInstance = null;

        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        // ===== LOAD AND PARSE EXCEL =====
        function loadAndParseExcel() {
            const fileInput = document.getElementById('excelFile');
            const messageDiv = document.getElementById('message');

            if (!fileInput.files[0]) {
                showMessage('❌ Выберите файл', 'error');
                return;
            }

            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    // Parse data
                    allData = jsonData.map(row => ({
                        date: row['дата операции'] || row['Дата операции'],
                        amount: parseFloat(row['Сумма'] || 0),
                        account: row['Счет'] || '',
                        category: row['
category'] || '',
                        type: row['Группа статей'] || (parseFloat(row['Сумма']) >= 0 ? 'Доход' : 'Расход')
                    })).filter(row => row.date && row.amount);

                    // Save to localStorage
                    localStorage.setItem('financialData', JSON.stringify(allData));
                    document.getElementById('fileName').textContent = `✅ ${file.name}`;
                    showMessage(`✅ Загружено ${allData.length} операций`, 'success');

                    // Show dashboard
                    showDashboard();
                    updateDashboard();
                } catch (error) {
                    showMessage(`❌ Ошибка парсинга: ${error.message}`, 'error');
                }
            };

            reader.readAsArrayBuffer(file);
        }

        // ===== UPDATE FILE NAME =====
        document.getElementById('excelFile').addEventListener('change', function() {
            if (this.files[0]) {
                document.getElementById('fileName').textContent = `📄 ${this.files[0].name}`;
            }
        });

        // ===== SHOW MESSAGE =====
        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
        }

        // ===== SHOW DASHBOARD =====
        function showDashboard() {
            document.getElementById('filtersSection').classList.remove('hidden');
            document.getElementById('metricsSection').classList.remove('hidden');
            document.getElementById('chartsSection').classList.remove('hidden');
            document.getElementById('monthlyChartSection').classList.remove('hidden');
            document.getElementById('tableSection').classList.remove('hidden');

            populateFilters();
            populateYearlyTable();
        }

        // ===== POPULATE FILTERS =====
        function populateFilters() {
            const years = [...new Set(allData.map(row => {
                const date = parseDate(row.date);
                return date ? date.getFullYear() : null;
            }).filter(y => y))].sort((a, b) => b - a);

            const yearSelect = document.getElementById('yearSelect');
            yearSelect.innerHTML = '<option value="">Все годы</option>';
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });

            // Set to latest year by default
            if (years.length > 0) {
                yearSelect.value = years[0];
            }

            // Set to latest month by default
            const monthSelect = document.getElementById('monthSelect');
            const latestDate = getLatestDate();
            if (latestDate) {
                monthSelect.value = latestDate.getMonth() + 1;
                yearSelect.value = latestDate.getFullYear();
            }
        }

        // ===== PARSE DATE =====
        function parseDate(dateString) {
            if (!dateString) return null;
            const parts = String(dateString).split('.');
            if (parts.length === 3) {
                return new Date(parts[2], parts[1] - 1, parts[0]);
            }
            return null;
        }

        // ===== GET LATEST DATE =====
        function getLatestDate() {
            let latest = null;
            allData.forEach(row => {
                const date = parseDate(row.date);
                if (date && (!latest || date > latest)) {
                    latest = date;
                }
            });
            return latest;
        }

        // ===== FILTER DATA =====
        function getFilteredData() {
            const yearSelect = document.getElementById('yearSelect');
            const monthSelect = document.getElementById('monthSelect');
            const selectedYear = yearSelect.value ? parseInt(yearSelect.value) : null;
            const selectedMonth = monthSelect.value ? parseInt(monthSelect.value) : null;

            return allData.filter(row => {
                const date = parseDate(row.date);
                if (!date) return false;

                if (selectedYear && date.getFullYear() !== selectedYear) return false;
                if (selectedMonth && date.getMonth() + 1 !== selectedMonth) return false;

                return true;
            });
        }

        // ===== UPDATE DASHBOARD =====
        function updateDashboard() {
            const filteredData = getFilteredData();

            updateMetrics(filteredData);
            updateCharts(filteredData);
            updateMonthlyChart();
        }

        // ===== UPDATE METRICS =====
        function updateMetrics(filteredData) {
            const income = filteredData
                .filter(row => row.amount > 0)
                .reduce((sum, row) => sum + row.amount, 0);

            const expense = Math.abs(filteredData
                .filter(row => row.amount < 0)
                .reduce((sum, row) => sum + row.amount, 0));

            const balance = income - expense;

            // Get previous month data for comparison
            const yearSelect = document.getElementById('yearSelect');
            const monthSelect = document.getElementById('monthSelect');
            const selectedYear = yearSelect.value ? parseInt(yearSelect.value) : null;
            const selectedMonth = monthSelect.value ? parseInt(monthSelect.value) : null;

            let prevIncome = 0, prevExpense = 0;

            if (selectedYear && selectedMonth) {
                const prevMonthDate = new Date(selectedYear, selectedMonth - 2, 1);
                const prevYear = prevMonthDate.getFullYear();
                const prevMonth = prevMonthDate.getMonth() + 1;

                const prevData = allData.filter(row => {
                    const date = parseDate(row.date);
                    if (!date) return false;
                    return date.getFullYear() === prevYear && date.getMonth() + 1 === prevMonth;
                });

                prevIncome = prevData
                    .filter(row => row.amount > 0)
                    .reduce((sum, row) => sum + row.amount, 0);

                prevExpense = Math.abs(prevData
                    .filter(row => row.amount < 0)
                    .reduce((sum, row) => sum + row.amount, 0));
            }

            // Calculate percentage changes
            const incomeChange = prevIncome ? ((income - prevIncome) / prevIncome * 100).toFixed(1) : 0;
            const expenseChange = prevExpense ? ((expense - prevExpense) / prevExpense * 100).toFixed(1) : 0;

            document.getElementById('incomeMetric').textContent = formatCurrency(income);
            document.getElementById('expenseMetric').textContent = formatCurrency(expense);
            document.getElementById('balanceMetric').textContent = formatCurrency(balance);

            const incomeChangeEl = document.getElementById('incomeChange');
            incomeChangeEl.textContent = incomeChange > 0 ? `↑ +${incomeChange}%` : `↓ ${incomeChange}%`;
            incomeChangeEl.className = `metric-change ${incomeChange >= 0 ? 'positive' : 'negative'}`;

            const expenseChangeEl = document.getElementById('expenseChange');
            expenseChangeEl.textContent = expenseChange > 0 ? `↑ +${expenseChange}%` : `↓ ${expenseChange}%`;
            expenseChangeEl.className = `metric-change ${expenseChange >= 0 ? 'negative' : 'positive'}`;

            const balanceChangeEl = document.getElementById('balanceChange');
            const balancePrevious = prevIncome - prevExpense;
            const balanceChangePercent = balancePrevious ? ((balance - balancePrevious) / Math.abs(balancePrevious) * 100).toFixed(1) : 0;
            balanceChangeEl.textContent = balanceChangePercent > 0 ? `↑ +${balanceChangePercent}%` : `↓ ${balanceChangePercent}%`;
            balanceChangeEl.className = `metric-change ${balanceChangePercent >= 0 ? 'positive' : 'negative'}`;
        }

        // ===== UPDATE CHARTS =====
        function updateCharts(filteredData) {
            // Income chart
            const incomeByCategory = {};
            filteredData
                .filter(row => row.amount > 0)
                .forEach(row => {
                    incomeByCategory[row.category] = (incomeByCategory[row.category] || 0) + row.amount;
                });

            const incomeTotal = Object.values(incomeByCategory).reduce((a, b) => a + b, 0);

            const incomeCtx = document.getElementById('incomeChart').getContext('2d');
            if (incomeChartInstance) {
                incomeChartInstance.destroy();
            }

            incomeChartInstance = new Chart(incomeCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(incomeByCategory),
                    datasets: [{
                        data: Object.values(incomeByCategory),
                        backgroundColor: [
                            '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9',
                            '#FF9800', '#FFB74D', '#FFCC80', '#FFE0B2', '#FFF3E0'
                        ],
                        borderColor: 'white',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: { size: 12 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.parsed || 0;
                                    const percent = ((value / incomeTotal) * 100).toFixed(1);
                                    return `${formatCurrency(value)} (${percent}%)`;
                                }
                            }
                        }
                    }
                },
                plugins: [{
                    id: 'textCenter',
                    beforeDatasetsDraw(chart) {
                        const { width, height, ctx } = chart;
                        ctx.restore();
                        const fontSize = (height / 200).toFixed(2);
                        ctx.font = `${fontSize}em sans-serif`;
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = '#333';

                        const text = formatCurrency(incomeTotal);
                        const textX = Math.round((width - ctx.measureText(text).width) / 2);
                        const textY = height / 2;

                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                }]
            });

            // Expense chart
            const expenseByCategory = {};
            filteredData
                .filter(row => row.amount < 0)
                .forEach(row => {
                    expenseByCategory[row.category] = (expenseByCategory[row.category] || 0) + Math.abs(row.amount);
                });

            const expenseTotal = Object.values(expenseByCategory).reduce((a, b) => a + b, 0);

            const expenseCtx = document.getElementById('expenseChart').getContext('2d');
            if (expenseChartInstance) {
                expenseChartInstance.destroy();
            }

            expenseChartInstance = new Chart(expenseCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(expenseByCategory),
                    datasets: [{
                        data: Object.values(expenseByCategory),
                        backgroundColor: [
                            '#f44336', '#ef5350', '#e57373', '#ef9a9a', '#ffcdd2',
                            '#2196F3', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD'
                        ],
                        borderColor: 'white',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                font: { size: 12 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const value = context.parsed || 0;
                                    const percent = ((value / expenseTotal) * 100).toFixed(1);
                                    return `${formatCurrency(value)} (${percent}%)`;
                                }
                            }
                        }
                    }
                },
                plugins: [{
                    id: 'textCenter',
                    beforeDatasetsDraw(chart) {
                        const { width, height, ctx } = chart;
                        ctx.restore();
                        const fontSize = (height / 200).toFixed(2);
                        ctx.font = `${fontSize}em sans-serif`;
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = '#333';

                        const text = formatCurrency(expenseTotal);
                        const textX = Math.round((width - ctx.measureText(text).width) / 2);
                        const textY = height / 2;

                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                }]
            });
        }

        // ===== UPDATE MONTHLY CHART =====
        function updateMonthlyChart() {
            const monthlyData = {};

            allData.forEach(row => {
                const date = parseDate(row.date);
                if (!date) return;

                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const key = `${year}-${String(month).padStart(2, '0')}`;

                if (!monthlyData[key]) {
                    monthlyData[key] = { income: 0, expense: 0 };
                }

                if (row.amount > 0) {
                    monthlyData[key].income += row.amount;
                } else {
                    monthlyData[key].expense += Math.abs(row.amount);
                }
            });

            const sortedKeys = Object.keys(monthlyData).sort();
            const labels = sortedKeys.map(key => {
                const [year, month] = key.split('-');
                return `${monthNames[parseInt(month) - 1]} ${year}`;
            });

            const incomeData = sortedKeys.map(key => monthlyData[key].income);
            const expenseData = sortedKeys.map(key => monthlyData[key].expense);

            const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
            if (monthlyChartInstance) {
                monthlyChartInstance.destroy();
            }

            monthlyChartInstance = new Chart(monthlyCtx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Доходы',
                            data: incomeData,
                            borderColor: '#4CAF50',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 3,
                            pointRadius: 5,
                            pointBackgroundColor: '#4CAF50',
                            pointBorderColor: 'white',
                            pointBorderWidth: 2
                        },
                        {
                            label: 'Расходы',
                            data: expenseData,
                            borderColor: '#f44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 3,
                            pointRadius: 5,
                            pointBackgroundColor: '#f44336',
                            pointBorderColor: 'white',
                            pointBorderWidth: 2
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                padding: 20,
                                font: { size: 14 },
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value);
                                }
                            },
                            grid: {
                                drawBorder: false,
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false
                            }
                        }
                    }
                }
            });
        }

        // ===== POPULATE YEARLY TABLE =====
        function populateYearlyTable() {
            const yearlyData = {};

            allData.forEach(row => {
                const date = parseDate(row.date);
                if (!date) return;

                const year = date.getFullYear();

                if (!yearlyData[year]) {
                    yearlyData[year] = { income: 0, expense: 0 };
                }

                if (row.amount > 0) {
                    yearlyData[year].income += row.amount;
                } else {
                    yearlyData[year].expense += Math.abs(row.amount);
                }
            });

            const tbody = document.getElementById('yearlyTableBody');
            tbody.innerHTML = '';

            const sortedYears = Object.keys(yearlyData).map(Number).sort((a, b) => b - a);

            sortedYears.forEach(year => {
                const data = yearlyData[year];
                const balance = data.income - data.expense;
                const balanceClass = balance >= 0 ? 'positive' : 'negative';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${year}</td>
                    <td class="income-text">${formatCurrency(data.income)}</td>
                    <td class="expense-text">${formatCurrency(data.expense)}</td>
                    <td class="balance-text ${balanceClass}">${formatCurrency(balance)}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // ===== FORMAT CURRENCY =====
        function formatCurrency(value) {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        }

        // ===== LOAD DATA FROM LOCALSTORAGE ON PAGE LOAD =====
        window.addEventListener('load', () => {
            const savedData = localStorage.getItem('financialData');
            if (savedData) {
                allData = JSON.parse(savedData);
                document.getElementById('fileName').textContent = '✅ Данные загружены из памяти';
                showDashboard();
                updateDashboard();
            }
        });
    </script>
</body>
</html>
