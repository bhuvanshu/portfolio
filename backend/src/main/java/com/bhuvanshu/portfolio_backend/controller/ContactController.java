package com.bhuvanshu.portfolio_backend.controller;

import com.bhuvanshu.portfolio_backend.model.Contact;
import com.bhuvanshu.portfolio_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactRepository repository;

    @Value("${admin.key}")
    private String adminKey;

    public ContactController(ContactRepository repository) {
        this.repository = repository;
    }

    // ── Auth helper ────────────────────────────────────────
    private ResponseEntity<?> unauthorized() {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Unauthorized"));
    }

    // ── POST /api/contact (public) ────────────────────────
    @PostMapping
    public ResponseEntity<Contact> saveContact(@Valid @RequestBody Contact contact) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(contact));
    }

    // ── GET /api/contact (admin only) ─────────────────────
    @GetMapping
    public ResponseEntity<?> getAllContacts(
            @RequestHeader(value = "X-ADMIN-KEY", required = false) String key) {

        if (key == null || !key.equals(adminKey)) {
            return unauthorized();
        }
        return ResponseEntity.ok(repository.findAll());
    }

    // ── DELETE /api/contact/{id} (admin only) ─────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(
            @PathVariable Long id,
            @RequestHeader(value = "X-ADMIN-KEY", required = false) String key) {

        if (key == null || !key.equals(adminKey)) {
            return unauthorized();
        }
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Contact not found"));
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
