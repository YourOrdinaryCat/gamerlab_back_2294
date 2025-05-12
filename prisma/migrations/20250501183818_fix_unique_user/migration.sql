/*
  Warnings:

  - You are about to drop the `Profesor` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Pendiente_confirmacion', 'Inscrito_confirmado', 'Inscripcion_completa', 'Rechazada');

-- CreateEnum
CREATE TYPE "EstadoJurado" AS ENUM ('confirmado', 'no_confirmado');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

-- DropTable
DROP TABLE "Profesor";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_contrasena" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" SERIAL NOT NULL,
    "equipo_id" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "github" TEXT NOT NULL,
    "confirmado" BOOLEAN NOT NULL DEFAULT false,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstudianteNRC" (
    "id_nrc" INTEGER NOT NULL,
    "id_estudiante" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EstudianteNRC_pkey" PRIMARY KEY ("id_nrc","id_estudiante")
);

-- CreateTable
CREATE TABLE "Jurado" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "estado" "EstadoJurado" NOT NULL DEFAULT 'no_confirmado',
    "token_confirmacion" TEXT NOT NULL,
    "ultima_conexion" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Jurado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "nombre_equipo" TEXT NOT NULL,
    "url_logo" TEXT NOT NULL,
    "estado" "Estado" NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videojuego" (
    "id" SERIAL NOT NULL,
    "equipo_id" INTEGER NOT NULL,
    "nombre_videojuego" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Videojuego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideojuegoAsignado" (
    "id_videojuego" INTEGER NOT NULL,
    "id_jurado" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VideojuegoAsignado_pkey" PRIMARY KEY ("id_videojuego","id_jurado")
);

-- CreateTable
CREATE TABLE "Materia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Materia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NRC" (
    "codigo_nrc" SERIAL NOT NULL,
    "materia_id" INTEGER NOT NULL,
    "profesor_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NRC_pkey" PRIMARY KEY ("codigo_nrc")
);

-- CreateTable
CREATE TABLE "Evaluacion" (
    "id" SERIAL NOT NULL,
    "jurado_id" INTEGER NOT NULL,
    "videojuego_id" INTEGER NOT NULL,
    "comentarios" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Evaluacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Criterio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Criterio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubrica" (
    "id_evaluacion" INTEGER NOT NULL,
    "id_criterio" INTEGER NOT NULL,
    "valoracion" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rubrica_pkey" PRIMARY KEY ("id_criterio","id_evaluacion")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolUsuario" (
    "id_usuario" INTEGER NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RolUsuario_pkey" PRIMARY KEY ("id_rol","id_usuario")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "metodo" "Tipo" NOT NULL,
    "num_parametros" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolEndpoint" (
    "id_rol" INTEGER NOT NULL,
    "id_endpoint" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RolEndpoint_pkey" PRIMARY KEY ("id_endpoint","id_rol")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_id_user_key" ON "Estudiante"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Jurado_id_user_key" ON "Jurado"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_nombre_equipo_key" ON "Equipo"("nombre_equipo");

-- CreateIndex
CREATE UNIQUE INDEX "Materia_codigo_key" ON "Materia"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluacion_jurado_id_videojuego_id_key" ON "Evaluacion"("jurado_id", "videojuego_id");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteNRC" ADD CONSTRAINT "EstudianteNRC_id_nrc_fkey" FOREIGN KEY ("id_nrc") REFERENCES "NRC"("codigo_nrc") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstudianteNRC" ADD CONSTRAINT "EstudianteNRC_id_estudiante_fkey" FOREIGN KEY ("id_estudiante") REFERENCES "Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jurado" ADD CONSTRAINT "Jurado_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videojuego" ADD CONSTRAINT "Videojuego_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "Equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideojuegoAsignado" ADD CONSTRAINT "VideojuegoAsignado_id_videojuego_fkey" FOREIGN KEY ("id_videojuego") REFERENCES "Videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideojuegoAsignado" ADD CONSTRAINT "VideojuegoAsignado_id_jurado_fkey" FOREIGN KEY ("id_jurado") REFERENCES "Jurado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NRC" ADD CONSTRAINT "NRC_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NRC" ADD CONSTRAINT "NRC_profesor_id_fkey" FOREIGN KEY ("profesor_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_jurado_id_fkey" FOREIGN KEY ("jurado_id") REFERENCES "Jurado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluacion" ADD CONSTRAINT "Evaluacion_videojuego_id_fkey" FOREIGN KEY ("videojuego_id") REFERENCES "Videojuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrica" ADD CONSTRAINT "Rubrica_id_evaluacion_fkey" FOREIGN KEY ("id_evaluacion") REFERENCES "Evaluacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrica" ADD CONSTRAINT "Rubrica_id_criterio_fkey" FOREIGN KEY ("id_criterio") REFERENCES "Criterio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolUsuario" ADD CONSTRAINT "RolUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolUsuario" ADD CONSTRAINT "RolUsuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolEndpoint" ADD CONSTRAINT "RolEndpoint_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolEndpoint" ADD CONSTRAINT "RolEndpoint_id_endpoint_fkey" FOREIGN KEY ("id_endpoint") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
