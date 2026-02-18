package com.bhuvanshu.portfolio_backend.repository;

import com.bhuvanshu.portfolio_backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository 
extends JpaRepository<Contact, Long> {
}
