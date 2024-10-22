	
			let categoryChart, subCategoryChart;

			// Funktion, um das Tortendiagramm zu erstellen
			function createPieChart1(data, labels, onClick) {
				const ctx = document.getElementById("pieChart1").getContext("2d");
				return new Chart(ctx, {
					type: "pie",
					data: {
						datasets: [
							{
								data: data,
								backgroundColor: ["#FFF5E4", "#6A9C89", "#CD5C08"], // Farben für die Kategorien
							},
						],
						labels: labels,
					},
					options: {
						responsive: true,
						onClick: onClick,
					},
				});
			}

			function createPieChart2(data, labels, onClick) {
				const ctx = document.getElementById("pieChart2").getContext("2d");
				return new Chart(ctx, {
					type: "pie",
					data: {
						datasets: [
							{
								data: data,
								backgroundColor: ["#FFD700", "#FF6347", "#4682B4", "#32CD32"], // Farben für die Unterkategorien
							},
						],
						labels: labels,
					},
					options: {
						responsive: true,
						onClick: onClick,
					},
				});
			}

			// Initiales Tortendiagramm für die Kategorieauswahl
			function initializeChart() {
				categoryChart = createPieChart1(
					[1, 1, 1], // Daten für das Tortendiagramm
					["Frühstück", "Mittagessen", "Abendessen"], // Labels für die Kategorien
					function (event, elements) {
						if (elements.length > 0) {
							const clickedIndex = elements[0].index;
							const category = categoryChart.data.labels[clickedIndex];

							// Zeigt nur die ausgewählte Kategorie im Diagramm
							categoryChart.data.datasets[0].data = [1];
							categoryChart.data.labels = [category];
							categoryChart.update();

							// Zeigt den zweiten Tortendiagramm an
							showSubCategoryChart();
						}
					}
				);
			}

			// Funktion, um das zweite Tortendiagramm anzuzeigen
			function showSubCategoryChart() {
				// Erstelle das zweite Tortendiagramm (nur wenn es noch nicht existiert)
				if (!subCategoryChart) {
					subCategoryChart = createPieChart2(
						[10, 20, 10, 40], // Daten für das zweite Tortendiagramm
						["Süß", "Sauer", "Heiß", "Kalt"], // Labels für die Unterkategorien
						function (event, elements) {
							if (elements.length > 0) {
								const clickedIndex = elements[0].index;
								const subCategory = subCategoryChart.data.labels[clickedIndex];
								alert(
									`Kategorie: ${categoryChart.data.labels[0]}, Unterkategorie: ${subCategory}`
								);

								// Hier könnte eine Funktion aufgerufen werden, um Rezepte basierend auf den Kategorien zu filtern
							}
						}
					);
				}

				// Fadet den zweiten Tortendiagramm ein
				const pieChart2 = document.getElementById("pieChart2");
				pieChart2.style.display = "block";
				fadeIn(pieChart2, 0.02);
			}

			// Funktion zum Einfaden
			function fadeIn(element, speed) {
				let opacity = 0;
				const interval = setInterval(function () {
					if (opacity >= 1) {
						clearInterval(interval);
					} else {
						opacity += speed;
						element.style.opacity = opacity;
					}
				}, 50);
			}

			// Funktion, um die Auswahl zurückzusetzen
			function resetSelection() {
				// Setzt das erste Tortendiagramm auf den Ursprungszustand zurück
				categoryChart.data.datasets[0].data = [1, 1, 1];
				categoryChart.data.labels = ["Frühstück", "Mittagessen", "Abendessen"];
				categoryChart.update();

				// Setzt das zweite Tortendiagramm zurück und blendet es aus
				if (subCategoryChart) {
					document.getElementById("pieChart2").style.display = "none";
					document.getElementById("pieChart2").style.opacity = 0;
					subCategoryChart.destroy();
					subCategoryChart = null;
				}

				// Versteckt den Reset-Button
				document.getElementById("resetButton").style.display = "none";
			}

			// Initialisiere das Diagramm beim Laden der Seite
			window.onload = initializeChart;
		
