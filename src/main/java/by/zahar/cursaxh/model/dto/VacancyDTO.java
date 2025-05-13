package by.zahar.cursaxh.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacancyDTO {
    private Long id;

    @NotBlank(message = "Название вакансии не может быть пустым")
    private String title;

    private String description;

    @NotBlank(message = "Отдел не может быть пустым")
    private String department;

    @NotBlank(message = "Статус не может быть пустым")
    private String status;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "Название вакансии не может быть пустым") String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank(message = "Название вакансии не может быть пустым") String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public @NotBlank(message = "Отдел не может быть пустым") String getDepartment() {
        return department;
    }

    public void setDepartment(@NotBlank(message = "Отдел не может быть пустым") String department) {
        this.department = department;
    }

    public @NotBlank(message = "Статус не может быть пустым") String getStatus() {
        return status;
    }

    public void setStatus(@NotBlank(message = "Статус не может быть пустым") String status) {
        this.status = status;
    }
}