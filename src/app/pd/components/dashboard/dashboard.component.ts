import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  nombreDashboard: string = '';
  urlSeleccionada: string = '';
  url: { [key: string]: { url: string, titulo: string } } = {
    "inflacion": { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSectionb6a61a014ea6d6d0ca40&pageName=ReportSection5e78fabe5000ca35d82b", "titulo": "Inflación" },
  "inversion-extranjera" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSection5e78fabe5000ca35d82b&pageName=ReportSectione4d01102b716c02676ca", titulo: "Inversión Extranjera" },
  "ipc-pais-indicador" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSection5e78fabe5000ca35d82b&pageName=ReportSectionb6a61a014ea6d6d0ca40", titulo: "Población" },
  "poblacion-total-pais" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSection", titulo: "Población total por país" },
  "poblacion-genero-pais" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSectionb4a1dce0c7ca7b30080e", titulo: "Poblacíon por genero y país" },
  "cantidad-empresas" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSection9298091518408d09ad8b", titulo: "Cantidad de empresas" },
  "exportaciones-primera-fecha" : { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSection0a004c7d0403822c8496", titulo: "Importaciones" },
  "importaciones-primera-fecha": { "url": "https://app.powerbi.com/view?r=eyJrIjoiNjdmOWZkMDgtZDljNi00ZjY0LWIwNmYtOGMxNDBjNzRjYWQwIiwidCI6Ijg5M2QzZjliLTc2ZjctNDFhNC04YjA5LWU2NDRhMGMxYmJmZiJ9&pageName=ReportSectionb620644fc9a9a3770e0e", "titulo": "Importaciones y primera fecha: Fuente por País" }
}
  constructor(private activatedRoute: ActivatedRoute) {
    this.nombreDashboard = this.activatedRoute.snapshot.paramMap.get('nombre') as string;
    this.urlSeleccionada = this.url[ this.nombreDashboard ].url;
  }

  ngOnInit(): void {
  }

}
