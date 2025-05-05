package com.mtgdistrict.mtgdistrict.Repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.mtgdistrict.mtgdistrict.Models.Entidad;

@NoRepositoryBean
public interface CrudRepository<T extends Entidad, ID extends Serializable> extends JpaRepository<T, ID> {
}

