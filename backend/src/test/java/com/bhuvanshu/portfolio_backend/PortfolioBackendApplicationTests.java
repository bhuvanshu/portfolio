package com.bhuvanshu.portfolio_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
		"spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect",
		"spring.mail.host=smtp.gmail.com",
		"spring.mail.port=587",
		"spring.mail.username=test@test.com",
		"spring.mail.password=testpassword",
		"admin.key=test-admin-key",
		"frontend.origin=http://localhost:3000"
})
class PortfolioBackendApplicationTests {

	@Test
	void contextLoads() {
		// Verifies the Spring context starts successfully with test properties
	}

}
