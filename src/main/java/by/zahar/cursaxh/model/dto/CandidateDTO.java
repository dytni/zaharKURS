package by.zahar.cursaxh.model.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CandidateDTO {
    private Long id;

    @NotBlank(message = "ФИО не может быть пустым")
    private String fullName;

    @Email(message = "Некорректный email")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$",
            message = "Номер телефона должен быть в формате +79991234567")
    private String phone;

    private String resume;

    public CandidateDTO(Long id, String fullName, String email, String phone, String resume) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.resume = resume;
    }

    public CandidateDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "ФИО не может быть пустым") String getFullName() {
        return fullName;
    }

    public void setFullName(@NotBlank(message = "ФИО не может быть пустым") String fullName) {
        this.fullName = fullName;
    }

    public @Email(message = "Некорректный email") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Некорректный email") String email) {
        this.email = email;
    }

    public @Pattern(regexp = "^\\+?[0-9]{10,15}$",
            message = "Номер телефона должен быть в формате +79991234567") String getPhone() {
        return phone;
    }

    public void setPhone(@Pattern(regexp = "^\\+?[0-9]{10,15}$",
            message = "Номер телефона должен быть в формате +79991234567") String phone) {
        this.phone = phone;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }
}